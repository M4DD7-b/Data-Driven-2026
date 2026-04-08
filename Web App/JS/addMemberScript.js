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

    // Check that a member object contains valid values before using it in SQL.
    const validateMember = (member) => {
      if (!member || typeof member !== "object") {
        return "Member details are required.";
      }

      // Clean up and convert values first so the checks below are easier to write.
      const homeCentreId = Number(member.homeCentreId);
      const memberId = Number(member.memberId);
      const memberForename = typeof member.memberForename === "string" ? member.memberForename.trim() : "";
      const memberSurname = typeof member.memberSurname === "string" ? member.memberSurname.trim() : "";
      const memberEmail = typeof member.memberEmail === "string" ? member.memberEmail.trim() : "";
      const memberPhone = typeof member.memberPhone === "string" ? member.memberPhone.trim() : "";
      const memberDOB = typeof member.memberDOB === "string" ? member.memberDOB.trim() : "";
      const membershipType = typeof member.membershipType === "string" ? member.membershipType.trim() : "";
      const membershipStartDate = typeof member.membershipStartDate === "string" ? member.membershipStartDate.trim() : "";

      if (!Number.isInteger(homeCentreId) || homeCentreId < 1) {
        return "Home Centre ID must be a whole number greater than 0.";
      }

      if (!Number.isInteger(memberId) || memberId < 1) {
        return "Member ID must be a whole number greater than 0.";
      }

      if (!memberForename || memberForename.length > 50) {
        return "Member Forename is required and must be 50 characters or fewer.";
    }

      if (!memberSurname || memberSurname.length > 50) {
        return "Member Surname is required and must be 50 characters or fewer.";
      }

      if (!memberEmail || memberEmail.length > 100) {
        return "Member Email is required and must be 100 characters or fewer.";
      }

      if (!memberPhone || memberPhone.length > 20) {
        return "Member Phone is required and must be 20 characters or fewer.";
      }

      if (!memberDOB) {
        return "Member Date of Birth is required.";
      }

      if (!membershipType || membershipType.length > 10) {
        return "Membership Type is required and must be 10 characters or fewer.";
      }

      if (!membershipStartDate) {
        return "Membership Start Date is required.";
      }

      return "";

    }

    // Replace single quotes with two single quotes so they are safer inside SQL strings.
    // /'/g means "find every single quote in the text" (g = global, so not just the first one).
        const escapeSql = (value) => {
            return value.replace(/'/g, "''");
        }
