"use client"; // For Next.js compatibility, remove if unnecessary
import React, { useState, useEffect } from "react";


  function Countdown() {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    


    // Updated Todos with random statuses
    const todosGiwrgos = [
      {
        task: "Ξεπέρασέ την...",
        date: "Χριστούγεννα '24",
        status: "failed",
      },
      {
        task: "Ολοκλήρωσε την πρώτη έκδοση των πορτραίτων...",
        date: "31 Γενάρη '25, transferred --ΜΕΣΑΙΑ προς ΥΨΗΛΗ ΠΡΟΤΕΡΑΙΟΤΗΤΑ",
        status: "current",
      },
      {
        task: "Ολοκλήρωσε τη σελίδα της Ελόριδος, ακόμα και αν δεν έχει ιδέα πως υπάρχει...",
        date: "31 Γενάρη '25",
        status: "pending",
      },
      {
        task: "Δοκίμασε τον αλγόριθμο με χρήματα...",
        date: "31 Δεκέμβρη '24",
        status: "completed",
      },
      {
        task: "Κάνε τουλάχιστον άλλη μια φορά τον Πεντελικό κύκλο, και κράτα χρόνο!",
        date: "Πριν πεθάνεις",
        status: "pending",
      },
      {
        task: "Κάνε τουλάχιστον άλλη μια φορά το Ράλλυ Αράχωβας-Δαύλεια, και κράτα χρόνο!",
        date: "Πριν πεθάνεις",
        status: "pending",
      },
      {
        task: "Γράψε την πραγματικά μικρή ιστορία (γερμανικά)",
        date: "Χριστούγεννα '24",
        status: "completed",
      },
      {
        task: "Γράψε την ιστορία μεσαίου μεγέθους (ελληνικά)",
        date: "Πρωτοχρονιά '25",
        status: "completed",
      },
      {
        task: "Ολοκλήρωσε την πρώτη έκδοση των πορτραίτων",
        date: "Χριστούγεννα '24 --μεγάλη αποτυχία",
        status: "failed",
      },
      {
        task: "Πάρε το keyboard και παίξε μερικά τραγούδια. Το μυστικό είναι να βελτιώνεσαι και να δοκιμάζεις νέα πράγματα (που στη θυμίζουν)",
        date: "Mε τα πρώτα έξτρα χρήματα, την πρώτη δυνατή περίοδο με αρκετό χρόνο",
        status: "pending",
      },
      {
        task: "Ολοκλήρωσε το KyrosGolafTrafficDistractionPack",
        date: "Χριστούγεννα '25, currently converting in .NET MAUI --XAMΗΛΗ ΠΡΟΤΕΡΑΙΟΤΗΤΑ",
        status: "current",
      },
      {
        task: "Κέρδισε τον Λούι σε σκάκι (άλλη μια φορά)...",
        date: "Πριν πεθάνει ένας από τους δύο κατά προτίμηση...",
        status: "pending",
      },
      {
        task: "Διάβασε (άλλη μια) ‘Die Leiden des jungen Werthers’ και τις Λευκές Νύχτες...",
        date: "Το συντομότερο δυνατόν, 31 Γενάρη '25 -- ΧΑΜΗΛΗ ΠΡΟΤΕΡΑΙΟΤΗΤΑ",
        status: "current",
      },
      {
        task: "Ολοκλήρωσε το πρότζεκτ Φώκιες",
        date: "Πριν πεθάνεις -- ΟΛΑ ΕΚΕΙ ΑΝΗΚΟΥΝ ΟΠΟΤΕ ΔΕΝ ΞΕΡΩ ΤΙ ΠΡΟΤΕΡΑΙΟΤΗΤΑ ΕΧΕΙ, ΠΕΡΙΣΣΟΤΕΡΟ ΩΣ ΓΕΝΙΚΗ ΙΔΕΑ",
        status: "current",
      },
      {
        task: "Μην κάνεις λάθος στους υπολογισμούς και μείνε συγκεντρωμένος",
        date: "Χριστούγεννα '24",
        status: "failed",
      },
      {
        task: "Διάβασε τουλάχιστον 4 μαθήματα (εκτός του πρότζεκτ)",
        date: "Πρωτοχρονιά '25",
        status: "failed",
      },
      {
        task: "Γράψε την έξτρα ιστορία για την νοσταλγία",
        date: "14 Γενάρη '25",
        status: "current",
      },
      {
        task: "Φτιάξε τον ENH:EEA:static_5: OH_ONLY, INNER_ONLY, DYNAMIC",
        date: "14 Γενάρη '25",
        status: "current",
      },
      {
        task: "Εργασία με γαμημένα αμβλυγώνια",
        date: "10 Γενάρη '25",
        status: "current",
      },
      {
        task: "Διάβασμα για εξεταστική (Θεωρία αριθμών(+ασκήσεις), υπολ.πολυπλοκότητα(+ασκήσεις), αλγ.επιχ.έρευνα)",
        date: "Αρχές Φλεβάρη '25",
        status: "current",
      },
      {
        task: "Εξήγησε τι γίνεται στο πρότζεκτ, για να μπορεί κάποιος να ασχοληθεί",
        date: "ΣΥΝΤΟΜΑ -- ΜΕΣΑΙΑ ΠΡΟΤΕΡΑΙΟΤΗΤΑ",
        status: "pending",
      },
      {
        task: "Πρώτες 2 εργασίες αμβλυγωνίων τριγώνων",
        date: "20 Δεκέμβρη '24",
        status: "completed",
      },
    ];

    const todosNestor = [
      {
        task: "Learn to cook properly...",
        date: "26th December 2023",
        status: "failed",
      },
      {
        task: "Finally organize the photo album...",
        date: "Mid-January 2024",
        status: "current",
      },
      {
        task: "Build a proper birdhouse for the sparrows...",
        date: "29th December 2023",
        status: "completed",
      },
      {
        task: "Rewatch ‘Schindler’s List’...",
        date: "1st January 2024",
        status: "pending",
      },
      {
        task: "Fix the broken bookshelf...",
        date: "22nd December 2023",
        status: "completed",
      },
    ];

    
    // Combine both lists with a separator
    const allTodos = [
      ...todosGiwrgos,
      <hr className="my-8 border-t-2 border-dashed border-gray-400" />,
      ...todosNestor,
    ];
  const finalDate = new Date("Januar 15, 2025 00:00:00").getTime();
    const tickSound = new Audio("./Sounds/tick.mp3"); // Path to your tick sound file
  
    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = finalDate - now;
  
        // Update time left
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
  
        // Play tick sound
        tickSound.play().catch((err) => {
          // Suppress errors to avoid spamming console if the user has sound disabled
          console.error("Tick sound error:", err);
        });
      }, 1000);
  
      return () => clearInterval(timer); // Cleanup interval on component unmount
    }, [tickSound]);

  
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-[#e6c3c3] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 font-crimson-text">
            🥀💀💀💀 🥀
          </h1>

          {/*Quote part*/}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "serif",
              backgroundColor: "#f7f7f7",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div style={{ marginRight: "20px", textAlign: "center" }}>
              <img
                src="./images/greek_pilar.png"
                alt="Left Column"
                style={{ width: "60px" }}
              />
            </div>
            <div style={{ maxWidth: "600px", textAlign: "center" }}>
              <h2 style={{ marginBottom: "20px", color: "#6b4a2d" }}>
                Ein Arschloch dachte einmal:
              </h2>
             
              <hr style={{ margin: "20px 0", borderColor: "#ccc" }} />
              <p style={{ fontSize: "18px", fontStyle: "italic", color: "#4a4a4a" }}>
                Zu entwickeln bedeutet zu akzeptieren, ohne unbedingt zu verstehen.
                Dinge passieren, auch wenn man sie nicht versteht. Was wahr ist, ich
                allein muss mich nähren, ich allein muss alles erreichen, und in Zukunft wieder pflegen.
                Das Letzte wird viel Kraft erfordern. Aber nichts kann wahr sein in
                dieser verfluchten Welt, außer meiner Realität und meinem Willen. Also
                lass diesen Willen nicht krank werden. Lass ihn freundlich und nett sein.
              </p>
              
              <hr style={{ margin: "20px 0", borderColor: "#ccc" }} />
              <p style={{ fontSize: "18px", fontStyle: "italic", color: "#4a4a4a" }}>
                Evolvere significat accipere, non necessario intellegere.
                Res fiunt, etiam si eas non intellegimus.
                Verum est hoc: ego solus me pascere debeo, ego solus omnia perficere debeo, et in futurum iterum colere.
                Hoc ultimum multum virium exiget.
                Sed nihil verum esse potest in hoc mundo damnato, nisi mea realitas et mea voluntas.
                Itaque ne ista voluntas infirma fiat. Sit illa benigna.
              </p>
              
            </div>
            <div style={{ marginLeft: "20px", textAlign: "center" }}>
              <img
                src="./images/greek_pilar.png"
                alt="Right Column"
                style={{ width: "60px" }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-4 border-dashed border-gray-700 my-12"></div>

          <h2 className="text-3xl text-center text-[#f5c6aa] font-bold mb-6">
            Nächste Termin
          </h2>
  
          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 text-center mb-16">
            {["Nights", "Hours", "Minutes", "Seconds"].map((label, idx) => (
              <div
                key={label}
                className="bg-[#2a2020] p-6 rounded-lg border border-[#4a3333] shadow-lg"
              >
                <div className="text-4xl md:text-6xl font-bold text-[#cc9999]">
                  {Object.values(timeLeft)[idx]}
                </div>
                <div className="text-sm md:text-base">{label}</div>
              </div>
            ))}
          </div>
  
          {/* Divider */}
          <div className="border-t-4 border-dashed border-gray-700 my-12"></div>

          {/* Count-Up Timer */}
          <div className="grid grid-cols-4 gap-4 text-center mb-16">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => {
              const now = new Date();
              const startDate = new Date("2024-10-01T19:00:00Z");
              const diffMs = now - startDate; // Difference in milliseconds
              const diffSecs = Math.floor(diffMs / 1000); // Total seconds

              // Calculate days, hours, minutes, seconds
              const days = Math.floor(diffSecs / (60 * 60 * 24));
              const hours = Math.floor((diffSecs % (60 * 60 * 24)) / (60 * 60));
              const minutes = Math.floor((diffSecs % (60 * 60)) / 60);
              const seconds = diffSecs % 60;

              const timeValues = [days, hours, minutes, seconds];

              return (
                <div
                  key={label}
                  className="bg-[#2a2020] p-6 rounded-lg border border-[#4a3333] shadow-lg"
                >
                  <div className="text-4xl md:text-6xl font-bold text-[#cc9999]">
                    {timeValues[idx]}
                  </div>
                  <div className="text-sm md:text-base">{label}</div>
                </div>
              );
            })}
          </div>
            
          {/* Divider */}
          <div className="border-t-4 border-dashed border-gray-700 my-12"></div>
          
          <div className="space-y-12">
            {/* Giorgos' Todos */}
            <div>
              <h2 className="text-3xl text-center text-[#f5c6aa] font-bold mb-6">
                Giorgos' Todos
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Failed Tasks */}
                  <div className="bg-red-900/30 p-4 rounded-lg border border-red-700">
                    <h3 className="text-red-500 font-bold mb-2">Failed</h3>
                    {todosGiwrgos
                      .filter((todo) => todo.status === "failed")
                      .map((todo, index) => (
                        <div
                          key={index}
                          className="bg-red-900/20 p-2 rounded mb-2 text-sm"
                        >
                          ❀ {todo.task}
                          <br />
                          <small>{todo.date}</small>
                        </div>
                      ))}
                  </div>

                  {/* Pending Tasks */}
                  <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-gray-400 font-bold mb-2">Pending</h3>
                    {todosGiwrgos
                      .filter((todo) => todo.status === "pending")
                      .map((todo, index) => (
                        <div
                          key={index}
                          className="bg-gray-800/20 p-2 rounded mb-2 text-sm"
                        >
                          ❀ {todo.task}
                          <br />
                          <small>{todo.date}</small>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Current Tasks */}
                  <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-700">
                    <h3 className="text-yellow-500 font-bold mb-2">Current</h3>
                    {todosGiwrgos
                      .filter((todo) => todo.status === "current")
                      .map((todo, index) => (
                        <div
                          key={index}
                          className="bg-yellow-900/20 p-2 rounded mb-2 text-sm"
                        >
                          ❀ {todo.task}
                          <br />
                          <small>{todo.date}</small>
                        </div>
                      ))}
                  </div>

                  {/* Completed Tasks */}
                  <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
                    <h3 className="text-green-500 font-bold mb-2">Completed</h3>
                    {todosGiwrgos
                      .filter((todo) => todo.status === "completed")
                      .map((todo, index) => (
                        <div
                          key={index}
                          className="bg-green-900/20 p-2 rounded mb-2 text-sm"
                        >
                          ❀ {todo.task}
                          <br />
                          <small>{todo.date}</small>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-4 border-dashed border-gray-700 my-12"></div>

            {/* Nestor's Todos */}
            <div>
              <h2 className="text-3xl text-center text-[#f5c6aa] font-bold mb-6">
                Nestor's Todos
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Failed Tasks */}
                  <div className="bg-red-900/30 p-4 rounded-lg border border-red-700">
                    <h3 className="text-red-500 font-bold mb-2">Failed</h3>
                    {todosNestor
                      .filter((todo) => todo.status === "failed")
                      .map((todo, index) => (
                        <div
                          key={index}
                          className="bg-red-900/20 p-2 rounded mb-2 text-sm"
                        >
                          ❀ {todo.task}
                          <br />
                          <small>{todo.date}</small>
                        </div>
                      ))}
                  </div>

                  {/* Pending Tasks */}
                  <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-gray-400 font-bold mb-2">Pending</h3>
                    {todosNestor
                      .filter((todo) => todo.status === "pending")
                      .map((todo, index) => (
                        <div
                          key={index}
                          className="bg-gray-800/20 p-2 rounded mb-2 text-sm"
                        >
                          ❀ {todo.task}
                          <br />
                          <small>{todo.date}</small>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Current Tasks */}
                  <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-700">
                    <h3 className="text-yellow-500 font-bold mb-2">Current</h3>
                    {todosNestor
                      .filter((todo) => todo.status === "current")
                      .map((todo, index) => (
                        <div
                          key={index}
                          className="bg-yellow-900/20 p-2 rounded mb-2 text-sm"
                        >
                          ❀ {todo.task}
                          <br />
                          <small>{todo.date}</small>
                        </div>
                      ))}
                  </div>

                  {/* Completed Tasks */}
                  <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
                    <h3 className="text-green-500 font-bold mb-2">Completed</h3>
                    {todosNestor
                      .filter((todo) => todo.status === "completed")
                      .map((todo, index) => (
                        <div
                          key={index}
                          className="bg-green-900/20 p-2 rounded mb-2 text-sm"
                        >
                          ❀ {todo.task}
                          <br />
                          <small>{todo.date}</small>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t-4 border-dashed border-gray-700 my-12"></div>
  






          {/* Experiment Section */}
          <div className="mb-12 text-center font-crimson-text text-lg bg-[#800080] p-8 rounded-lg shadow-lg border-2 border-[#cc9999] relative">
            {/* Decorative Hearts */}
            <div className="absolute -top-6 left-6 text-[#cc9999] text-2xl animate-pulse">❤️</div>
            <div className="absolute -top-6 right-6 text-[#cc9999] text-2xl animate-pulse">❤️</div>
            <div className="absolute -bottom-6 left-6 text-[#cc9999] text-2xl animate-pulse">❤️</div>
            <div className="absolute -bottom-6 right-6 text-[#cc9999] text-2xl animate-pulse">❤️</div>
  
            {/* Content */}
            <p className="text-[#008000] italic mb-4">
              Κοινωνικό (όχι πια προσωπικό, καθώς συμμετέχουν 2 άτομα, γίει) πείραμα:
            </p>
            <p className="text-[#008000] italic mb-4">
              Απόψε (το εξηγεί ο μελλοντικός μου εαυτός μετά την λήξη του χρόνου) θα δούμε αν μια
              αντίστροφη μέτρηση χρόνου μπορεί να αυξήσει την παραγωγικότητα σε όλα τα παρακάτω
              "to-dos". Ας ελπίσουμε για τουλάχισοτν ένα τιμιότατο 75% επιτυχίας!
            </p>
            <p className="text-[#008000] italic mb-4">
              Αν το πείραμα επιστρέψει θετικά αποτελέσματα, τότε φαντάζομαι μθα μπορώ να ξεκουραστώ
              για λίγο. Αν όχι, τότε θα αναγκαστώ να ξεκουραστώ, απλώς με την λύπη της αποτυχίας...
            </p>
          </div>


        </div>
      </div>
    );
  }
  
  export default Countdown;
