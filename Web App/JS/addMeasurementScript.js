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
    const validateMeasurement = (measurement) => {
      if (!measurement || typeof measurement !== "object") {
        return "Measurement details are required.";
      }

      // Clean up and convert values first so the checks below are easier to write.
      const memberId = Number(measurement.memberId);
      const memberStartWeight = Number(measurement.memberStartWeight);
      const memberCurrentWeight = Number(measurement.memberCurrentWeight);
      const memberStartMuscleMass = Number(measurement.memberStartMuscleMass);
      const memberCurrentMuscleMass = Number(measurement.memberCurrentMuscleMass);
      const memberCondition = typeof measurement.memberCondition === "string" ? measurement.memberCondition.trim() : "";

      if (!Number.isInteger(memberId) || memberId < 1) {
        return "Member ID must be a whole number greater than 0.";
      }

      if (!Number.isFinite(memberStartWeight) || memberStartWeight <= 0) {
        return "Member Start Weight must be a positive number.";
      }

      if (!Number.isFinite(memberCurrentWeight) || memberCurrentWeight <= 0) {
        return "Member Current Weight must be a positive number.";
      }

      if (!Number.isFinite(memberStartMuscleMass) || memberStartMuscleMass <= 0) {
        return "Member Start Muscle Mass must be a positive number.";
      }

      if (!Number.isFinite(memberCurrentMuscleMass) || memberCurrentMuscleMass <= 0) {
        return "Member Current Muscle Mass must be a positive number.";
      }

      if (memberCondition.length > 100) {
        return "Member Condition cannot exceed 100 characters.";
      }

      return "";
    }

    // Replace single quotes with two single quotes so they are safer inside SQL strings.
    // /'/g means "find every single quote in the text" (g = global, so not just the first one).
        const escapeSql = (value) => {
            return value.replace(/'/g, "''");
        }
