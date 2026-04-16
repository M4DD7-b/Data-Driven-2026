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

    // Check that a measurement object contains valid values before using it in SQL.
    const validateCoachCentre = (coachCentre) => {
      if (!coachCentre || typeof coachCentre !== "object") {
        return "Coach assignment details are required.";
      }

      // Clean up and convert values first so the checks below are easier to write.
      const coachId = Number(coachCentre.coachId);
      const centreId = Number(coachCentre.centreId);

      if (!Number.isInteger(coachId) || coachId < 1) {
        return "Coach ID must be a whole number greater than 0.";
      }

      if (!Number.isInteger(centreId) || centreId < 1) {
        return "Centre ID must be a whole number greater than 0.";
      }

      return ""; // No problems found.
    }

// Replace single quotes with two single quotes so they are safer inside SQL strings.
// /'/g means "find every single quote in the text" (g = global, so not just the first one).
    const escapeSql = (value) => {
        return value.replace(/'/g, "''");
    }
