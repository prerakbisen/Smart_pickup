// server.js
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");

const app = express();

// Allow requests from your frontend (running at port 4028)
app.use(cors({ origin: "http://localhost:4028" }));
app.use(express.json());

// MySQL connection (update password if needed)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Prerak#17.com",   // keep your password here
  database: "smart_pickup"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL (smart_pickup)");
});

// ----------------- REGISTER -----------------
app.post("/api/register", async (req, res) => {
  try {
    const {
      role,
      full_name,
      email,
      phone_number,
      vehicle_number,
      staff_id,
      password,
      child1,
      child2,
      child3,
      child4
    } = req.body;

    if (!role || !full_name || !email || !phone_number || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (role === "parent" && !child1) {
      return res.status(400).json({ message: "Child1 is required for parents" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const check = "SELECT * FROM users WHERE email = ? OR phone_number = ?";
    db.query(check, [email, phone_number], (err, result) => {
      if (err) return res.status(500).json({ error: err });

      if (result.length > 0) {
        return res.status(400).json({ message: "Email or phone already exists" });
      }

      let sql, values;

      if (role === "parent") {
        sql = `
          INSERT INTO users 
          (full_name, email, phone_number, password_hash, role, vehicle_number, child1_name, child2_name, child3_name, child4_name)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        values = [
          full_name,
          email,
          phone_number,
          hashed,
          role,
          vehicle_number || null,
          child1,
          child2 || null,
          child3 || null,
          child4 || null
        ];
      }

      if (role === "admin") {
        sql = `
          INSERT INTO users 
          (full_name, email, phone_number, password_hash, role, staff_id)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        values = [
          full_name,
          email,
          phone_number,
          hashed,
          role,
          staff_id || null
        ];
      }

      db.query(sql, values, (err2, result2) => {
        if (err2) {
          console.log("Insert Error:", err2);
          return res.status(500).json({ message: "Insert failed" });
        }

        return res.json({ message: "Registration successful" });
      });
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});


// ----------------- LOGIN -----------------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  const q = "SELECT * FROM users WHERE email = ? LIMIT 1";
  db.query(q, [email], async (err, results) => {
    if (err) {
      console.error("Login DB error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (!results || results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    try {
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Return minimal user info for frontend
      return res.json({
        message: "Login successful",
        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          role: user.role,
          vehicle_number: user.vehicle_number || null,
          staff_id: user.staff_id || null,
          child1: user.child1 || null,
          child2: user.child2 || null,
          child3: user.child3 || null,
          child4: user.child4 || null
        }
      });
    } catch (compareErr) {
      console.error("Password compare error:", compareErr);
      return res.status(500).json({ message: "Server error" });
    }
  });
});


// ---------------- FETCH QUEUE (JOIN users + plate_logs) ----------------
app.get("/api/queue", (req, res) => {
  // Use the latest detection per plate, then join to users by normalized vehicle number.
  // This avoids returning multiple rows for the same vehicle when there are multiple plate_logs entries.
  const query = `
    SELECT
      u.user_id AS id,
      u.child1_name AS studentName,
      u.child2_name AS child2Name,
      u.child3_name AS child3Name,
      u.child4_name AS child4Name,
      u.vehicle_number AS vehicle_number,
      u.full_name AS guardianName,
      u.phone_number AS guardianPhone,
      p.latest_detected_at AS arrivalTime,
      'Arrived' AS status
    FROM users u
    INNER JOIN (
      SELECT detected_plate, MAX(detected_at) AS latest_detected_at
      FROM plate_logs
      GROUP BY detected_plate
    ) p
      ON TRIM(UPPER(u.vehicle_number)) = TRIM(UPPER(p.detected_plate))
    WHERE u.role = 'parent'
    ORDER BY p.latest_detected_at DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Queue API SQL Error:", err);
      return res.status(500).json({ error: "SQL ERROR", details: err });
    }
    res.json(results);
  });
});


// ---------------- FETCH ATTENDANCE (MATCH BY face and VEHICLE NUMBER) ----------------
app.get("/api/attendance-list", (req, res) => {
  const query = `
    SELECT 
      u.user_id AS id,
      u.full_name AS guardianName,
      u.vehicle_number AS vehicle_number,
      u.phone_number AS guardianPhone,

      -- Child names (some users may have multiple children)
      u.child1_name AS child1Name,
      u.child2_name AS child2Name,
      u.child3_name AS child3Name,
      u.child4_name AS child4Name,

      -- Attendance table fields
      att.id AS attendance_id,
      att.name AS studentName,
      att.roll_no AS detectedVehicle,
      
      'Present' AS status
    FROM attendance att
    INNER JOIN users u
      ON TRIM(UPPER(att.roll_no)) = TRIM(UPPER(u.vehicle_number))
    WHERE u.role = 'parent'
    ORDER BY att.id DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Attendance API SQL Error:", err);
      return res.status(500).json({ error: "SQL ERROR", details: err });
    }
    res.json(results);
  });
});



// Return the single latest plate_log along with matched user (if any)
// app.get('/api/process-latest', (req, res) => {
//   const q = `SELECT id, detected_plate, detected_at FROM plate_logs ORDER BY detected_at DESC LIMIT 1`;
//   db.query(q, (err, results) => {
//     if (err) {
//       console.error('process-latest SQL error:', err);
//       return res.status(500).json({ error: 'SQL ERROR', details: err });
//     }

//     if (!results || results.length === 0) {
//       return res.json({ plate: null, user: null });
//     }

//     const plate = results[0];

//     const userQ = `
//       SELECT * FROM users
//       WHERE TRIM(UPPER(vehicle_number)) = TRIM(UPPER(?))
//       LIMIT 1
//     `;
//     db.query(userQ, [plate.detected_plate], (uErr, uRes) => {
//       if (uErr) {
//         console.error('process-latest user lookup error:', uErr);
//         return res.status(500).json({ error: 'SQL ERROR', details: uErr });
//       }

//       const user = (uRes && uRes.length > 0) ? uRes[0] : null;

//       // Normalize returned field names to what frontend expects
//       const plateOut = {
//         id: plate.id,
//         detected_plate: plate.detected_plate,
//         created_at: plate.detected_at
//       };

//       return res.json({ plate: plateOut, user });
//     });
//   });
// });

// // Return recent plate_logs (limit N)
// app.get('/api/plate-logs/recent/:n', (req, res) => {
//   const n = parseInt(req.params.n, 10) || 10;
//   const q = `SELECT id, detected_plate, detected_at FROM plate_logs ORDER BY detected_at DESC LIMIT ?`;
//   db.query(q, [n], (err, results) => {
//     if (err) {
//       console.error('recent plate_logs SQL error:', err);
//       return res.status(500).json({ error: 'SQL ERROR', details: err });
//     }
//     // map to created_at for compatibility
//     const out = results.map(r => ({ id: r.id, detected_plate: r.detected_plate, created_at: r.detected_at }));
//     res.json(out);
//   });
// });

// Display all users APi 
app.get("/api/students", (req, res) => {
  const sql = `
    SELECT 
      user_id,
      full_name,
      role,
      vehicle_number,
      child1_name,
      child2_name,
      child3_name,
      child4_name,
      created_at
    FROM users
    WHERE role = 'parent';
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
