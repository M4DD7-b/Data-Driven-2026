    // Send an SQL query to dbConnector.php and return the JSON response.
    const runQuery = async (sql) => {
      try {
        // This is the PHP endpoint that talks to the database for us.
        const url = "http://localhost/dbConnector.php";

        // Send the SQL statement in the body of a POST request.
        const response = await fetch(url, {
          method: "POST",
          body: new URLSearchParams({ query: sql })
        });

        // Stop and report a problem if the web request itself failed.
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }

        // Convert the JSON text from PHP into a JavaScript object.
        const result = await response.json();
        return result;

      } catch (error) {
        // Log errors so they can be seen in the browser console during debugging.
        console.log(error.message);
      }
    }

    // Check that a reservation object contains valid values before using it in SQL.
    const validateReservation = (reservation) => {
      if (!reservation || typeof reservation !== "object") {
        return "Reservation details are required.";
      }

      // Clean up and convert values first so the checks below are easier to write.
      const classId = Number(reservation.classId);
      const memberId = Number(reservation.memberId);

      if (!Number.isInteger(classId) || classId < 1) {
        return "Class ID must be a whole number greater than 0.";
      }

      if (!Number.isInteger(memberId) || memberId < 1) {
        return "Member ID must be a whole number greater than 0.";
      }

      return "";
    }