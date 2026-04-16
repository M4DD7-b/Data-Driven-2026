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
    const validateCoach = (coach) => {
      if (!coach || typeof coach !== "object") {
        return "Coach details are required.";
      }

      // Clean up and convert values first so the checks below are easier to write.
      const coachForename = typeof coach.coachForename === "string" ? coach.coachForename.trim() : "";
      const coachSurname = typeof coach.coachSurname === "string" ? coach.coachSurname.trim() : "";
      const coachEmail = typeof coach.coachEmail === "string" ? coach.coachEmail.trim() : "";
      const coachPhone = typeof coach.coachPhone === "string" ? coach.coachPhone.trim() : "";
      const coachSpecialisation = typeof coach.coachSpecialisation === "string" ? coach.coachSpecialisation.trim() : "";
      
      if (!coachForename || coachForename.length > 50) {
        return "Coach Forename is required and cannot exceed 50 characters.";
      }

      if (!coachSurname || coachSurname.length > 50) {
        return "Coach Surname is required and cannot exceed 50 characters.";
      }

      if (!coachEmail || coachEmail.length > 100) {
        return "Coach Email is required and cannot exceed 100 characters.";
      }

      if (!coachPhone || coachPhone.length > 20) {
        return "Coach Phone is required and cannot exceed 20 characters.";
      }

      if (!coachSpecialisation || coachSpecialisation.length > 100) {
        return "Coach Specialisation is required and cannot exceed 100 characters.";
      }

      return ""; // No problems found.
    }

// Replace single quotes with two single quotes so they are safer inside SQL strings.
// /'/g means "find every single quote in the text" (g = global, so not just the first one).
    const escapeSql = (value) => {
        return value.replace(/'/g, "''");
    }
