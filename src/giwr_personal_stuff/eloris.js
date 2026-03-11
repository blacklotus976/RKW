"use client";
import emailjs from "emailjs-com";
import React, { useState, useEffect } from "react";

function Eloris() {
    //Αν το βλεπεις αυτο απο inspect Element τοτε κλεβεις. Αν εισαι η ιδια η Ελορις τοτε χαλαλι σου, δεν πειραζει. 
    //Αν εισαι ο Χρηστος, ο Μικρος Φωκιονας ή καποιος αλλος dev τοτε ξαφανισου απο δω ειναι κλεψια,
    //δεν το εφτιαξα για τα ματια σου αλλα για της Ελοριδος. 
    //Και ναι αν απορειτε (οποιος και αν ειστε) τοτε ναι, προτιμησα να ριψοκινδυνευσω την αδφαλεια της σελιδας παρα να φτιαξω ενα ασφαλες backend.
    //"Ριψοκινδυνευσω" ειναι αστεια λεξη, καθως δεν με νοιαζει να βρεθει ο κωδικος, απλα απο την καταλληλη ανθρωπο...
    const correctPassword = "160422"; // Replace with your desired 9-digit password
    //ΔΙΑΒΑΣΕ ΤΑ ΠΑΡΑΠΑΝΩ ΣΧΟΛΙΑ ΠΡΙΝ ΑΝΤΙΓΡΑΨΕΙΣ ΑΥΤΟΝ ΤΟΝ ΚΩΔΙΚΟ. ΑΝ ΔΕΝ ΕΙΣΑΙ ΤΟ ΑΤΟΜΟ ΣΤΟ 
    //ΟΠΟΙΟ ΑΠΕΥΘΥΝΩ ΑΥΤΗ ΤΗ ΣΕΛΙΔΑ, ΟΥΣΤ, ΦΥΓΕ ΚΑΙ ΜΗΝ ΚΟΙΤΑΣ, ΚΟΥΤΣΟΜΠΟΛΗ/Α!!!


    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLocked, setIsLocked] = useState(false); // Lock state after 3 failed attempts
    const [showPopup, setShowPopup] = useState(false); // Controls lock popup visibility
    // Add state to track navigation button visibility
    const [showNavigateButton, setShowNavigateButton] = useState(false);  
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // New state for success popup
    const [attempts, setAttempts] = useState(0); // Reset attempts when closing the popup
    const [input, setInput] = useState(""); // Reset input field when closing the popup
    const [message, setMessage] = useState(""); // Reset message when closing the popup
    

    const [showSimplePopup, setShowSimplePopup] = useState(false);
    const [showAnalyticalPopup, setShowAnalyticalPopup] = useState(false);
    const [showDistrustPopup, setShowDistrustPopup] = useState(false);
    const [showLocationPopup, setShowLocationPopup] = useState(false);
    
    const [showHexagon, setShowHexagon] = useState(false); // state to control popup visibility
    const toggleHexagon = () => {
        setShowHexagon(!showHexagon);
    };



  const memories = [
    {
      image: "./images/roda_lunapark.png",
      caption: "Ραντεβού σε Λούνα (Αλού φαν) Πάρκ -- Ρόδα",
    },
    {
      image: './images/prwti_mas_foto.png',
      caption: "Πρώτη μας φωτογραφία μαζί -- Κηφισιά",
    },
    {
      image: "./images/deuteri_mas_fwto.png",
      caption: "Δεύτερη μας φωτογραφία μαζί -- Κηφισιά",
    },
    {
      image: "./images/marousi_volta.png",
      caption: "Φωτογραφία που τράβηξες σε καθρέπτη -- Μαρούσι",
    },
    {
      image: "./images/palio_spiit_thalias_delfi.png",
      caption: "Σέλφι -- Διόνυσος, Ιούλιος '22, Παλιό σπίτι μαμάς Θάλειας",
    },
    {
      image: "./images/simply_burgers_selfi.png",
      caption: "Σέλφι στα Σίμπλι-- Κηφισιά",
    },
  ];

  const [isExpandedIntro, setIsExpandedIntro] = useState(false); // State to handle expanding content

  const toggleExpandIntro = () => {
    setIsExpandedIntro(!isExpandedIntro); // Toggle the expanded state
  };

  const [isExpandedToDo, setIsExpandedToDo] = useState(false); // State to handle expanding content

  const toggleExpandToDo = () => {
    setIsExpandedToDo(!isExpandedToDo); // Toggle the expanded state
  };


  const [isExpandedLove, setIsExpandedLove] = useState(false);
  const toggleExpandLove = () => {
    setIsExpandedLove(!isExpandedLove);
  }


  const [isExpandedExtra, setIsExpandedExtra] = useState(false); // State to handle expanding content
  const toggleExpandExtra = () => {
    setIsExpandedExtra(!isExpandedExtra); // Toggle the expanded state
  };


  const [isExpandedMusic, setIsExpandedMusic] = useState(false); // State to handle expanding content

  const toggleExpandMusic = () => {
    setIsExpandedMusic(!isExpandedMusic); // Toggle the expanded state
  };



  const [isExpandedLastMessage, setIsExpandedLastMessage] = useState(false); // State to handle expanding content

  const toggleExpandLastMessage = () => {
    setIsExpandedLastMessage(!isExpandedLastMessage); // Toggle the expanded state
  };


  const [isExpandedApology, setIsExpandedApology] = useState(false);

  const toggleExpandApology = () => {
    setIsExpandedApology(!isExpandedApology); // Toggle between expanded/collapsed state
  };

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % memories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);


  const closePopup = () => {
    setShowPopup(false); // Hide the popup
    setInput(""); // Clear input
    setAttempts(0); // Reset attempts count
    setIsLocked(false); // Unlock if locked
    setMessage(""); // Clear any displayed messages
  };



//   const handleLockInput = (value) => {
//     if (isLocked) return;
  
//     if (value === "C") {
//       setInput("");
//       setMessage(""); // Clear current input and message
//     } else if (value === "E") {
//       if (input === correctPassword) {
//         setMessage("Password correct! Click the close button and expect to see a re-navigation button. If it isn't there then I'm really sorry if it malfunctioned...");
//         setAttempts(0); // Reset attempts on success
//         setShowNavigateButton(true); // Show the navigation button in the popup
//         setShowSuccessPopup(true); // Show success popup
//       } else {
//         const newAttempts = attempts + 1;
//         setAttempts(newAttempts);
//         if (newAttempts >= 3) {
//           setIsLocked(true);
//           setMessage("Too many failed attempts. Input blocked. IP and other scrapped data collected sent to email.");
//           reportFailedAttempt(); // Send the report
//         } else {
//           setMessage("Password failed. Try again.");
//         }
//       }
//     } else {
//       setInput((prev) => (prev + value).slice(0, 9)); // Append digit, max length 9
//     }
//   };

const handleLockInput = async (value) => {
    if (isLocked) return;
  
    if (value === "C") {
      setInput("");
      setMessage(""); // Clear current input and message
    } else if (value === "E") {
      if (input === correctPassword) {
        setMessage("Password correct! Click the close button and expect to see a re-navigation button. If it isn't there then I'm really sorry if it malfunctioned...");
        setAttempts(0); // Reset attempts on success
        setShowNavigateButton(true); // Show the navigation button in the popup
        setShowSuccessPopup(true); // Show success popup
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
          setIsLocked(true);
          setMessage("Too many failed attempts. Input blocked. IP and other scrapped data collected sent to email.");
          
          const locationData = await reportFailedAttempt();
  
          if (locationData) {
            const { ip, country_name, city, latitude, longitude } = locationData;
            setMessage(`Too many failed attempts. IP and data sent. Your IP: ${ip}, Location: ${city}, ${country_name}`);
            setShowLocationPopup({
              ip,
              country_name,
              city,
              latitude,
              longitude
            });
          }
        } else {
          setMessage("Password failed. Try again.");
        }
      }
    } else {
      setInput((prev) => (prev + value).slice(0, 9)); // Append digit, max length 9
    }
  };

  
  
  

//   const reportFailedAttempt = () => {
//     // Get IP and other details
//     fetch("https://api64.ipify.org?format=json")
//       .then((response) => response.json())
//       .then((data) => {
//         const ip = data.ip;
//         const userAgent = navigator.userAgent;
//         const platform = navigator.platform;
//         const browserInfo = getBrowserInfo();
//         const timestamp = new Date().toISOString();
  
//         // Construct the report details
//         const reportDetails = `
//           Failed Attempt Details:
//           - IP Address: ${ip}
//           - Timestamp: ${timestamp}
//           - Platform: ${platform}
//           - Browser: ${browserInfo}
//           - User Agent: ${userAgent}
//         `;
  
//         console.log("Report:", reportDetails);
  
//         // Send email
//         sendReportByEmail(reportDetails);
//       })
//       .catch((error) => console.error("Failed to fetch IP details:", error));
//   };

const reportFailedAttempt = async () => {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      const ip = data.ip;
  
      // Get location details using the IP
      const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
      const locationData = await locationResponse.json();
  
      const { country_name, city, latitude, longitude } = locationData;
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const browserInfo = getBrowserInfo();
      const timestamp = new Date().toISOString();
  
      // Construct the report details
      const reportDetails = `
        Failed Attempt Details:
        - IP Address: ${ip}
        - Timestamp: ${timestamp}
        - Country: ${country_name}
        - City: ${city}
        - Latitude: ${latitude}, Longitude: ${longitude}
        - Platform: ${platform}
        - Browser: ${browserInfo}
        - User Agent: ${userAgent}
      `;
  
      console.log("Report:", reportDetails);
  
      // Send email
      sendReportByEmail(reportDetails);
  
      // Return the IP and location details
      return { ip, country_name, city, latitude, longitude };
    } catch (error) {
      console.error("Failed to fetch IP or location details:", error);
      return null;
    }
  };
  
  // Helper function to get browser information
  const getBrowserInfo = () => {
    const { appName, appVersion, userAgent, platform } = navigator;
    return `${appName} - Version: ${appVersion}, Platform: ${platform}, UserAgent: ${userAgent}`;
  };
  
  // Function to send the report via email
  const sendReportByEmail = (reportDetails) => {
    emailjs
      .send(
        "service_3h03s51", // Replace with your EmailJS Service ID
        "template_2l03g5b", // Replace with your EmailJS Template ID
        {
          report: reportDetails,
        },
        "ZDdysVZZ30_sPWUMC" // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );
  };

  return (
    <div className="min-h-screen bg-[#f5e6d3] p-8 font-crimson-text bg-opacity-80">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Romantic Title Section */}
        <div className="text-center space-y-4">
            Special Version for louis to view. the official version is not available yet... nice!
          <h1 className="text-5xl md:text-7xl text-[#8b4513] mb-6 animate-float">
            Καλημέρα και Όνειρα Γλυκά
          </h1>
          <div className="flex justify-center gap-2">
            <i className="fas fa-heart-broken text-4xl text-[#8b0000]"></i>
            <i className="fas fa-heart text-4xl text-[#ff0000]"></i>
            <i className="fas fa-dove text-4xl text-[#f5f5f5]"></i>
            <i className="fas fa-heart text-4xl text-[#ff0000]"></i>
            <i className="fas fa-heart-broken text-4xl text-[#8b0000]"></i>
          </div>
        </div>


        <div className="bg-[#fdf1e3] p-8 rounded-lg shadow-lg border-2 border-[#8b4513] mt-12">
            <h2 className="text-3xl text-[#832729] mb-6">Σημειώσεις developer (αγνοήστε)... kinda like ToDo table...</h2>
            <ul
                className={`text-lg md:text-xl text-[#4a4a4a] leading-relaxed list-inside list-disc pl-5 ${
                isExpandedToDo ? "block" : "max-h-0 overflow-hidden" // Collapse the list and hide its contents when not expanded
                }`}
            >
                <li className="italic">Αποφάσισε τι θα μείνει από προτάσεις και τι θα φύγει...</li>
                <li className="italic">Δεν μπορείς να τα αφήσεις όλα...</li>
                <li className="italic">Φτιάξε παιχίδι ρουλέτας με φωτογραφίες για να γίνει πιο ενδιαφέρον...</li>
                <li className="italic">Σήκωσε τις φωτογραφίες και τους κωδικούς, καθώς και τα συατήματα αναφοράς σε κάποιο backend σύστημα, για απόλυτη ασφάλεια (τώρα έχουμε 99.9999...9...% αντί για 100%)</li>
                <li className="italic">Ολοκλήρωση αναφοράς δυσπιστίας... με πονάει ακόμα και να σκέφτομαι πως πρέπει να το φτιάξω...</li>
                <li className="italic">Βαριέμαι να φτιάξω και να σηκώσω και backend...</li>
            </ul>

            {/* Button to expand the content */}
            <button
                onClick={toggleExpandToDo}
                className="mt-4 text-[#832729] hover:text-[#632912] underline"
            >
                {isExpandedToDo ? "Collapse" : "Read More"}
            </button>
        </div>

        {/* Privacy Guarantee Section */}
        <div className="bg-[#fdf1e3] p-8 rounded-lg shadow-lg border-2 border-[#8b4513] mt-12">
        <h2 className="text-3xl text-[#832729] mb-6">Εγγύηση Ασφάλειας Προσωπικών Δεδομένων</h2>
        <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
            Η προστασία προσωπικών δεδομένων όπως φωτογραφίες (και δικές σου) ή μηνύματα (δικά μου) αποτελεί θέμα ύψιστης προτεραιότητας. Το url αυτής της ιστοσελίδας δεν είναι γνωστό σε κανέναν εκτός εμού και (πιθανώς, αλλά για να το διαβάζεις (αν το διαβάσεις ποτέ)) εσένα. Τα παρακάτω κουμπιά εξηγούν καλύτερα την εγγύηση ασφάλειας.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
            {/* Simple Analysis Button */}
            <button
            onClick={() => setShowSimplePopup(true)}
            className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#632912]"
            >
            Απλή εξήγηση
            </button>

            {/* Analytical Details Button */}
            <button
            onClick={() => setShowAnalyticalPopup(true)}
            className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#632912]"
            >
            Αναλυτική εξήγηση
            </button>

            {/* Distrust Button */}
            <button
            onClick={() => setShowDistrustPopup(true)}
            className="bg-[#c04000] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#a83200]"
            >
            Kουμπί Δυσπιστίας
            </button>
        </div>

        {/* Simple Analysis Popup */}
        {showSimplePopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
                    <h2 className="text-xl font-bold text-[#8b4513]">
                        Απλή εξήγηση εγγύησης προστασίας προσωπικών δεδομένων
                    </h2>
                    <p className="text-lg text-[#4a4a4a] leading-relaxed">
                        Το url αυτής της συγκεκριμένης ιστοσελίδας δεν αποθηκεύεται, διαμοιράζεται ή γνωστοποιείται πουθενά. Ο μόνος τρόπος πρόσβασης εδώ για κάποια/ον, είναι να γνωρίζει ακριβώς την κατάληξη του url και να το δακτυλογραφήσει ολόσωστα σε κάποιον φυλλομετρητή. Τυχαία (ή εσκεμμένα επιτυχημένη) πρόσβαση θεωρείται ισοπίθανη με το να μαντεύεις τον κωδικό κάποιας/ου. Επίσης ανά τακτά χρονικά διαστήματα, το url αλλάζει, μειώνοντας τις πιθανότητες τυχαίας πρόσβασης...
                    </p>
                    <h3 className="text-lg font-semibold text-[#8b4513] mt-4">
                        Προηγούμενες καταλήξεις URL:
                    </h3>
                    <ul className="list-disc list-inside text-left text-[#4a4a4a]">
                        <li>/secretpage123</li>
                        <li>/hiddenlove456</li>
                        <li>/mydream789</li>
                        <li>/nostalgia101</li>
                        <li>/specialcode202</li>
                    </ul>
                    <button
                        onClick={() => setShowSimplePopup(false)}
                        className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}

        {/* Analytical Details Popup */}
        {showAnalyticalPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 text-center relative">
                    <h2 className="text-xl font-bold text-[#8b4513]">Αναλυτικές Πληροφορίες Ιδιωτικότητας</h2>
                    <div 
                        className="overflow-y-auto max-h-[75vh] p-2 space-y-4 text-left"
                        style={{ scrollbarWidth: "thin", scrollbarColor: "#8b4513 #fdf1e3" }}
                    >
                        <p className="text-lg text-[#4a4a4a] leading-relaxed">
                            Από μαθηματική σκοπιά, η πιθανότητα κάποιος να ανακαλύψει τυχαία αυτήν τη σελίδα είναι σχεδόν μηδενική. 
                            Έστω ότι το URL έχει μήκος <em>L</em> χαρακτήρες και κάθε χαρακτήρας μπορεί να είναι ένας από τους <em>C</em> δυνατούς χαρακτήρες 
                            (π.χ. λατινικοί χαρακτήρες, αριθμοί, και ειδικά σύμβολα). Ο συνολικός αριθμός πιθανών URLs είναι:
                        </p>
                        <p className="text-lg text-[#4a4a4a] leading-relaxed italic">
                            <strong>N = C^L</strong>
                        </p>
                        <p className="text-lg text-[#4a4a4a] leading-relaxed">
                            Για παράδειγμα, αν <em>C = 62</em> (26 μικρά γράμματα, 26 κεφαλαία γράμματα, 10 αριθμοί) και το μήκος <em>L = 15</em>, τότε:
                        </p>
                        <p className="text-lg text-[#4a4a4a] leading-relaxed italic">
                            <strong>N = 62^{15} ≈ 7.96 × 10^{26}</strong>
                        </p>
                        <p className="text-lg text-[#4a4a4a] leading-relaxed">
                            Αυτός ο αριθμός είναι ασύλληπτα μεγάλος. Η πιθανότητα κάποιος να μαντέψει σωστά το URL με μία τυχαία απόπειρα είναι:
                        </p>
                        <p className="text-lg text-[#4a4a4a] leading-relaxed italic">
                            <strong>P(success) = 1/N = 1 / (62^{15})</strong>
                        </p>
                        <p className="text-lg text-[#4a4a4a] leading-relaxed">
                            Δηλαδή, μία πιθανότητα μικρότερη από 10^{-26}. Ακόμη και αν ένας υπολογιστής κάνει ένα τρισεκατομμύριο (10^{12}) 
                            απόπειρες ανά δευτερόλεπτο, θα χρειαζόταν περισσότερο από:
                        </p>
                        <p className="text-lg text-[#4a4a4a] leading-relaxed italic">
                            <strong>t = N / (10^{12}) ≈ 2.5 × 10^{14} χρόνια</strong>
                        </p>
                        <p className="text-lg text-[#4a4a4a] leading-relaxed">
                            για να βρει το URL. Επιπλέον, η σελίδα δεν είναι ευρετηριασμένη από μηχανές αναζήτησης, 
                            ούτε υπάρχουν σύνδεσμοι προς αυτήν. Συνεπώς, η ιδιωτικότητά της είναι εγγυημένη τόσο μαθηματικά όσο και πρακτικά.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAnalyticalPopup(false)}
                        className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md mt-4"
                    >
                        Close
                    </button>
                </div>
            </div>
        )}

        {/* Distrust Popup */}
        {showDistrustPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4 text-center">
                <h2 className="text-xl font-bold text-[#c04000]">Έκφραση Δυσπιστίας</h2>
                <p className="text-lg text-[#4a4a4a] leading-relaxed">
                💔 'Ντάξει 'ντάξει. Κατά 50% θα μετακομίσω την υπέροχη αυτή σελίδα και δεν θα την ξαναδείς ποτέ, κατά 50% θα την κατεβάσω και θα την έχω locally... Αν και αυτό καταστρέφει το όμορφο μου ψηφιακό μνημείο... <br /> <p><sub>*: θα έπρεπε να υπήρχει μια φόρμα συμπλήρωσης αίτησης 'κατεβάσματος' της σελίδας. Αν όχι, τότε δεν την έχω τελείωσει ακόμα και ακόμα δουλεύω σε αυτό...</sub></p>
                </p>
                <button
                onClick={() => setShowDistrustPopup(false)}
                className="bg-[#c04000] text-white px-4 py-2 rounded-lg shadow-md"
                >
                Close
                </button>
            </div>
            </div>
        )}
        </div>





        <div className="bg-[#fdf1e3] p-8 rounded-lg shadow-lg border-2 border-[#8b4513] mt-12">
            <h2 className="text-3xl text-[#832729] mb-6">Πρόλογος | Στόχος αυτής της σελίδας</h2>
            
            {/* Emojis placed next to each other */}
            <div className="flex justify-center gap-2 mb-4">
                <i className="fas fa-pen text-[#000000] text-2xl"></i>
                <i className="fas fa-heart text-[#ff0000] text-2xl"></i>
                <i className="fas fa-pencil-alt text-[#000000] text-2xl"></i>
            </div>

            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
                <s>
                    Η σελίδα αυτή δημιουργήθηκε με σκοπό να αποτελέσει έναν προσωπικό και συναισθηματικό χώρο, ο οποίος καταγράφει τις στιγμές, τις σκέψεις και τα συναισθήματα ενός ανθρώπου σε μια δύσκολη, αλλά και όμορφη (συζητήσιμο) πορεία ζωής. 
                    Είναι ένα είδος ψηφιακού ημερολογίου που μοιράζεται με τον κόσμο μέσω κωδικών και γρίφων, με την ελπίδα να ακουστούν οι κρυφές σκέψεις που δεν βρίσκουν εύκολα χώρο στην καθημερινή επικοινωνία. 
                    Αυτή η σελίδα είναι σαν ένα μυστικό καταφύγιο για συναισθηματική έκφραση, μέσα από λέξεις και εικόνες που αντανακλούν προσωπικά βιώματα και πόθους.
                </s>
            </p>

            {/* <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic"> */}
            <p className={`text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic mt-4 ${isExpandedIntro ? 'block' : 'line-clamp-5'}`}>
                <br /> <strong>Καλύτερα αναδιατυπωμένο</strong>:<br />
                    Δημιούργησα αυτή τη σελίδα, για τον ίδιο λόγο και με την ίδια σκέψη που έγραψα εκείνα τα γράμματ ακαι ζωγράφισα εκείνες τις εικόνες.
                    Βασικά αυτός ο λόγος είναι ένας συνδυασμός λόγων, που τον κάνουν μοναδικό. Συγκεκριμένα αποτελείται από:
                    <ul className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed list-inside list-disc pl-5">
                        <li className="italic">την ανάγκη να μην σκέφτομαι, και απλώς να συγκεντρώνομαι σε ένα πράγμα,</li>
                        <li className="italic">την ανάγκη να στοχεύσω κάπου όποιον πόνο ή λύπη είχα (στοχεύσω δημιουργικά)</li>
                        <li className="italic">την ανάγκη να εκφράσω κάπως την μετάνοια και την λύπη μου</li>
                        <li className="italic">την ανάγκη να μοιραστώ πράγματα και να μην τα κρύβω μέσα μου</li>
                        <li className="italic">την ελπίδα να πέσει στα κατάλληλα χέρια (στην συγκεκριμένη περίπτωση μάτια...)</li>
                        <li className="italic">την ανάγκη να νοιώσω πως βελτιώνομαι (ξέρω πως γράφεται με 'ι' αλλά τόσα χρόνια το συνήθισα με 'οι')</li>
                        <li className="italic">την ανάγκη να προσφέρω μια απολογία, είτε γίνει δεκτή με τον τρόπο που πραγματικά επιθυμώ είτε όχι</li>
                        <li className="italic">--θα γράψω τα υπόλοιπα αργότερα--</li>
                    </ul>
                    Ναι οπότε, όλοι αυτοί οι διαφορετικοί λόγοι ενώνονται σε ένα συνονθύλευμα, το οποίο μερικοί το αποκαλούν αγάπη, άλλοι δημιουργικότητα με γλύκα, άλλοι ηλιθιότητα, άλλοι (σε έλλειψη καλύτερων λέξεων) κριπουλιά και άλλοι έλλειψη αξιοπρέπειας...<br />
                    <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">-----------------------------------------------------------------------------------------</p>
                    Γενικώς υπήρξα πάντα γεμάτος υπερηφάνεια, αλαζονεία και έπαρση, αλλά για μια φορά σε αυτό το ζήτημα (ό,τι αφορά εσένα κοινώς) δεν μου βγαίνει. Σε αντίθεση ίσως βγαίνει ταπεινώτητα μαζί με έντονα συναισθήματα (όχι αυτά του θυμού, αλλά τα πικρόγλυκα, βάλε λίγη μελαγχολία και κάποια άλλα και γίναμε). Οπότε φτάνω εδώ που είμαι και προσπαθώ να (σου) τα εκφράσω. Βέβαια αυτή τη στιγμή έχουμε μια απόσταση μεταξύ μας, οπότε σεβόμενος τις επιλογές/αποφάσεις σου (που τόσο μισώ) θα τα γράψω, θα τα εκφράσω δημιουργικά και είθε να υπάρξει καλή στιγμή να τα δεις (και να μην τα βρεις περίεργα--αυτό δεν θα έχει πλάκα).<br />
                    <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">-----------------------------------------------------------------------------------------</p>
                    Ο καταδικασμένος και παρανοϊκός συγγραφέας/προγραμματιστής σας (πληθυντικό ευγενείας σε 'σένα, δεν εύχομαι γενικά σε πολλούς, δεν είναι για τα μάτια των πολλών αυτο) εύχεται καλή ανάγνωση. Bis zum nächsten Mal... lass mich zumindest allein hoffen, dass es ein nächstes Mal geben wird..
            </p>

            {/* Button to expand the content */}
            <button
                onClick={toggleExpandIntro}
                className="mt-4 text-[#832729] hover:text-[#632912] underline"
            >
                {isExpandedIntro ? 'Collapse' : 'Read More'}
            </button>

        </div>

        
        

        {/* Collage Section */}
        <div className="relative w-full h-[60vh] max-h-[1000px] overflow-hidden rounded-lg shadow-lg">
        <h2 className="text-3xl text-[#832729] mb-6">Ρουλέτα Αναμνήσεων</h2>
            <img
                src={memories[currentImageIndex].image}
                alt="Our precious memories together"
                className="w-full h-full object-contain" // Adjusted to maintain aspect ratio
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                <p className="text-lg">{memories[currentImageIndex].caption}</p>
            </div>
            
        </div>
        

        

        {/* Apology Section */}
        <div className="bg-[#fdf1e3] p-8 rounded-lg shadow-lg border-2 border-[#8b4513]">
            <h2 className="text-3xl text-[#832729] mb-6">
                Απολογία από τα τρίσβαθα της καρδιάς μου...
                <br />
                <p>
                <sub>ή τουλάχιστον από το μέγιστο βάθος που πιστεύεις πως έχω...</sub>
                </p>
            </h2>

            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
                Μου προτάθηκε<sup>*</sup> να πω το εξής:
                <br />
                <s>
                My love, I know I made mistakes that hurt you. For every word spoken
                in anger, for every moment of insensitivity, I am truly sorry. I carry
                the weight of regret in my heart, and I long to make things right. Please
                know that every part of me is devoted to making amends and proving that
                my love for you is unending.
                </s>
            </p>
            <br />
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
                Αλλά ακόμα και να το μετέφραζα, ακόμα και αν με εκπροσωπεί στις γλυκές,
                ελπιδοφόρες στιγμές μου, δεν εκπροσωπεί τον τρόπο με τον οποίο εκφράζομαι.
                Οπότε ορίστε, με δικά μου λόγια:
                <br />
            </p>
            <br />

            {/* Collapsible Apology Content */}
            <p
                className={`text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic mt-4 ${
                isExpandedApology ? "block" : "line-clamp-1"
                }`}
            >
                Μπλα μπλα μπλα,{" "}
                <strong>
                θα το συμπληρώσω στην επίσημη έκδοση για να μην το δεις και το
                κοροϊδεύεις Λου!!!
                </strong>
            

            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
                -----------------------------------------------------------------------------------------
            </p>
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
                Οπότε, έχοντας πει αυτά, και όντας ανήμπορος να σταματήσω να σκέφτομαι
                πως σου μιλάω, θα αφήσω άλλο ένα μήνυμα, αλλά κωδικοποιημένο, στην
                μορφή που γνωρίζεις, στην ίδια μορφή που σου έγραφα γρίφους τότε
                παλιά ("τότε παλιά" καθώς δεν ξέρω πότε θα το διαβάζεις αυτό...), όχι
                πως έχω όρεξη να σου σπαταλάω τον χρόνο ή να παίζω χαζά παιχνίδια (καλά
                ίσως ένα 20% μουνα έχει τέτοια όρεξη, πάντα μου άρεσε αυτό), αλλά δεν
                είναι για τα μάτια της/του τυχαίας/ου αναγνώστριας/η... οπότε ναι!
            </p>
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
                -----------------------------------------------------------------------------------------
            </p>
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
                <sub>
                *: "προτάθηκε", ίδια υποσημείωση/επεξήγηση με την επόμενη. Έγραψα πρώτα
                πάρακατω, οπότε δεν το ξαναγράφω εδώ, μείνε με ανάποδη σειρά{" "}
                <strong>ΜΠΟΥ ΧΑ ΧΑ</strong>!
                </sub>
            </p>
            </p>

            <div className="flex justify-center gap-4 mt-4">
                {/* Crying Sad Face */}
                <i className="fas fa-sad-tear text-4xl text-[#eee8aa]"></i>
                {/* Flower */}
                <i className="fas fa-seedling text-4xl text-[#008000]"></i>
            </div>
            

            {/* Button to expand/collapse the content */}
            <button
                onClick={toggleExpandApology}
                className="mt-4 text-[#832729] hover:text-[#632912] underline"
            >
                {isExpandedApology ? "Collapse" : "Read More"}
            </button>
            </div>

        {/* Love Declaration */}
        <div className="bg-[#fdf1e3] p-8 rounded-lg shadow-lg border-2 border-[#8b4513]">
          <h2 className="text-3xl text-[#832729] mb-6">How Much I Love You</h2>
          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Ενημερώνω εκ των προτέρων, για να αποφύγουμε παρεξηγήσεις, και <strong>κυρίως</strong> γιατί νοιώθω πιο προετοιμασμένος άμα τα δηλώσω μόνος<strong>*</strong>, πως τα λόγια που ακολουθούν μπορεί να θεωρηθούν γλυκά, ανούσια, ηλίθια, παιδιάστικα, ρομαντικά, πιεστικά, εκνευριστικά, και άλλα άσχημα πράγματα...</p>
          <div className={`text-lg md:text-xl text-[#4a4a4a] leading-relaxed list-inside list-disc pl-5 ${
                isExpandedLove ? "block" : "max-h-0 overflow-hidden" // Collapse the list and hide its contents when not expanded
                }`}>
            <br /><p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Δεν μπορώ να ξέρω πως θα αντιδράσεις, αν και ελπίζω σε κάτι συγκεκριμένο. Αλλά δεν έχει νόημα τώρα τι ελπίζω γω, αλλά τι θα πω... </p><br />
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Δήλωσα την απολογία μου παραπάνω, οπότε δεν θα επαναλάβω συγγνώμες, αντιθέτως θα προσπαθήσω να συγκεντρωθώ στα συναισθήματα μου...</p> <br />
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Δεν έχει υπάρξει ούτε μία μέρα που να μην σε σκέφτηκα, και σχεδόν ούτε μία νύχτα που να μην σε ονειρεύτηκα, άλλοτε γλυκά, άλλοτε με πόνο --αυτό πάει και για τα όνειρα και για τις σκέψεις--. Έχω προσπαθήσει τα πάντα για να μην σκέφτομαι, αλλά δεν μπορώ... κλείνω τα μάτια μου και τσουπ! εκεί είναι το μουτράκι σου να μου χαμογελάει. Βγάζω τα ακουστικά από τα αυτιά μου για λίγα δευτερόλεπτα και ακούω τη φωνή σου, είτε να με φωνάζει, είτε να μου μιλάει, είτε να μου ψυθιρίζει --ίσως φταίει που άκουσα αμέτρητες φορές τα φωνητικά σου, λολ--. Το να αποσπώμαι γίνεται πιο δύσκολο μέρα με τη μέρα, πράγμα αντιστρόφως ανάλογο με το πόσο σε αγαπώ, το οποίο περιέργως αυξάνεται μέρα με τη μέρα... Θα μου πεις πως γίνεται αυτό, εδώ δεν μιλάμε καν. Ναι το ξέρω αλλά όλες οι αναμνήσεις, τις θυμάμαι στον ξύπνιο και τις ξαναζώ στον ύπνο.</p><br />
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Πολλές φορές έχω προσπαθήσει να αξιοποιήσω τον πόνο μου δημιουργικά, και πολλές φορές τα καταφέρνω! Έχω βρει κάποιου είδους παρηγοριάς στο να ζωγραφίζω. Έχω προσπαθήσει να σου κάνω μερικά πορτραίτα, όντας εμπνευσμένος από εκείνη τη μέρα που μου έκανες δώρο μια ζωγραφιά μου με ένα ποίημα. Προσπαθώ να ξεπεράσω το επίπεδο τέχνης που παρουσίασες τότε, ή τουλάχιστον να προσφέρω κάτι αντάξιο --δεν είναι εδώ ο χώρος για ανάλυση τέχνης, και εκεί είχες δίκια και υπήρξα ηλίθιος... αλλά άλλη στιγμή--, σίγουρα όχι κάτι κακής ποιότητας. Σίγουρα όχι κάτι βιαστικό, σίγουρα όχι κάτι φθηνό. Περιέργως μόνο σε τέτοιες ζωγραφιές μπορώ να χαλαρώσω κάπως. Μόνο τότε νοιώθω πως με πιάνει μια γλύκα (σαν να αναπολεί κάποιος γλυκά τις καλές στιγμές), η οποία βοηθάει γι ανα ηρεμώ λίγο, και να νοιώθω πάλι καλά με τον εαυτό μου, ή τουλάχιστον όχι βασανισμένος --αυτό δεν υποδεικνύει πως έχω ανάγκη εσένα για να φτιαχτώ, αλλά πως νοιώθω έντονα!--.</p><br />
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Άλλες φορές αρκούμαι στο να γράφω απλά γράμματα στα σημειωματάρεια μου, απευθυνόμενα σε 'σένα. Εκεί έχω υπάρξει αρκετά συναισθηματικός, γλυκός, πικρόγλυκος, θυμωμένος, απεγνωσμένος, γενικώς τα πάντα... όλα αυτά ώστε τώρα να μπορώ να γράψω καθαρά. Δεν μπορώ να αναπληρώσω το κενό που μου άφησες, και αν δίνει περισσότερη αξία στο τι νοιώθω προς τα εσένα, δεν θέλω καν. Καταλαβαίνω πως ίσως εσύ να μπορείς να κάνεις την αντίστοιχη δουλειά εκ μέρους σου, ίσως να είσαι δυνατή, ίσως αποφασισμένη... καλό για 'σένα. Εγώ είμαι αποφασισμένος να τιμήσω τη μνήμη μας, να την διατηρήσω κάπου, για όσο καιρό αντέξω ψυχικά. Υπολογίζω σίγουρα μέχρι τα Χριστούγεννα, ίσως 2-3 μήνες παραπέρα. Παραπάνω δύσκολο. Βέβαια εννοείται το να σε δω με άλλη συντροφιά θα επισπεύσει αυτό τον χρόνο. Ξέρω ακούγεται άσχημο, γιατί θέλω να είσαι χαρούμενη, αλλά ο εγωιστής εαυτός μου θέλει να είσαι χαρούμενη μαζί μου, να είμαστε χαρούμενοι μαζί! Σίγουρα ακολουθώντας τακτικές τύπου "το μη χείρον βέλτιστον", το να είσαι χαρούμενη --ακόμα και με άλλη παρέα-- είναι καλύτερο από το να μην είσαι χαρούμενη, οπότε θα ένοιωθα πιο άσχημα αν ήσουν στεναχωρημένη μόνη παρά χαρούμενη με άλλον. Το έχω σκεφτεί υποτίθεται --όντως έχω σκεφτεί πάνω σε αυτό το θέμα πολύ-- και καλύτερα να κουβαλάω εγώ μόνος τον πόνο της απόστασής μας, εγώ που έχω και την αμαρτία και κανένα μέλλον, παρά εσύ, που έχεις τόσες ευκαιρίες να ανθίσεις και να ζήσεις χαρούμενη.</p><br />
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Οι παραπάνω προτάσεις αποτελούν την τέλεια εισαγωγή --εννοώ την τέλεια μετάβαση-- στο τι συμβαίνει όταν δεν θυμάμαι γλυκά, αλλά με απόγνωση και απελπισία... Πριν αυτού όμως να σημειωθεί πως --νοιώθω λίγο ένοχα να στο εκμυστηρεύομαι αυτό-- δεν είναι λίγες οι φορές που σκέφτομαι να σε παίρνω αγκαλιά, να μυρίζω τα μαλλιά σου και να σε φιλώ στο μέτωπο. Ή να με παίρνεις εσύ αγκαλιά, και να χαλαρώνω, νοιώθοντας ασφαλής και ήρεμος. Είχες την πιο ζεστή αγκαλιά που γνώρισα ποτέ (1. αμφιβάλλω αν υπάρχει πιο ζεστή γενικά, η θαλπωρή σου, η ζεστασιά, η γλύκα, 2.ελπίζω να την έχεις ακόμα, 3. ελπίζω να ξαναπέσω θύμα της κάποτε). Είναι γλυκές σκέψεις που με κάνουν να ξεφεύγω από την σκληρή πραγματικότητα, και για λίγο να είμαι σχεδόν χαρούμενος. Ένας maester από το Game of Thrones είπε πριν πεθάνει τα εξής (με ένα γλυκό χαμόγελο στο πρόσωπο του, μεταφράζω ελεύθερα και σημειώνω επίσης, πως ήταν <strong>τυφλός</strong>):</p>          
            <br /><p className="text-lg md:text-xl text-[#8b0000] leading-relaxed font-extrabold" style={{fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", // Replace with a calligraphic or elegant font family
                    letterSpacing: "0.5px",
                    transform: "skewX(-10deg)", // Adds a slight lean to the right
            }}>
                "Α χα. Θα μπορούσα να σου πω τα πάντα για 'κείνη. Ποιά ήταν. Πως γνωριστήκαμε. Το χρώμα των ματιών της και το σχήμα της μύτης της. Μπορώ να τη δω αυτή τη στιγμή μπροστά μου. Είναι πιο πραγματική από 'τι 'σύ. Θα μπορούσαμε να περάσουμε όλη τη νύχτα ανταλλάσσοντας ιστορίες χαμένης αγάπης. Τίποτα δεν κάνει το παρελθόν ένα πιο γλυκό μέρος να επισκεφθείς, από την προοπτική ενός επικείμενου θανάτου."
            </p>
            <br /><p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Ποτέ δεν πίστευα πως θα ταυτιστώ τόσο πολύ με λόγια από φανταστικούς χαρακτήρες, πάντα πίστευα πως θα έφτιαχνα τα δικά μου. Αλλά στα "τελευταία" μας ξανα-έβλεπα την σειρά και μου έκανε εντύπωση η φράση. Δεν μου έμεινε επειδή νοιώθω μελλοθάνατος, αλλά επειδή προσπαθώ να ζω στον υπέροχο, όμορφο και ήρεμο κόσμο μου, όπου εσύ είσαι εκεί συνέχεια, και μπορούμε να είμαστε χαρούμενοι. Ζω ονειροπολώντας θα έλεγε κανείς, όμορφα όνειρα για να αντισταθμίσω την πικρή ζωή. Γλύκες για να πάνε κάτω οι πίκρες...</p>
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Για να σε προλάβω και να σου καλύψω την απορία, πριν απορήσεις γελώντας για το που πήγε η αξιοπρέπεια μου --πραγματικά ελπίζω να μην το κάνεις αυτό τώρα--, ορίστε άλλη μια ελεύθερη μετάφραση από τον ίδιο χαρακτήρα από παραπάνω. Μπορεί να σου ακούγεται περίεργο ή ακόμα και αστείο, αλλά ήταν ο πιο σοφός μάγιστρος στη σειρά, έζησε ως τα 102!</p>
            <br /><p className="text-lg md:text-xl text-[#8b0000] leading-relaxed font-extrabold" style={{fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", // Replace with a calligraphic or elegant font family
                    letterSpacing: "0.5px",
                    transform: "skewX(-10deg)", // Adds a slight lean to the right
            }}>
                "Τι είναι η τιμή μπροστά στην αγάπη μιας γυναίκας; Τι είναι το καθήκον μπροστά στην αίσθηση ενός νεογέννητου γιού στην αγκαλιά σου... ή την ανάμνηση του χαμόγελου ενός αδερφού; Άνεμοι και λέξεις. Άνεμοι και λέξεις. Είμαστε μόνο άνθρωποι, και οι Θεοί μας σχεδίασαν για αγάπη. Αυτή είναι η μεγάλη μας δόξα, και η μεγάλη μας τραγωδία."
            </p><br />
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Αντικαθιστώντας την αγάπη "μιας" γυναίκας με την δική σου, βγάζει πολύ νόημα για 'μένα. Ελπίζω αυτά να εξηγούν τις γλυκές μου σκέψεις για 'σένα. Ένας ακόμα τρόπος να "κοπάρω" με την απώλεια σου είναι να κουβαλάω μαζί τον "Σασαγαπούλα" που μου έπλεξες. Σαν 'χθες θυμάμαι την κάρτα με τα λόγια: "για να σου κρατάει συντροφία όταν λείπω". Δεν είναι πως μπορεί να σε αναπληρώσει, αλλά τον να μην τον έχω μαζί φέρνει άγχος. Λες και συμβολίζει όλη μου την ελπίδα πως θα επιστρέψεις και θα μου ξανακρατήσεις συντροφιά --όσο να πεις είναι το καλύτερο δώρο που μου έχεις κάνει ποτέ, ή τουλάχιστον αυτό που λάτρεψα περισσότερο. Αντιλαμβάνομαι πως δεν έχω άπειρο χώρο εδώ --γι'αυτό είναι οι σημειώσεις μου-- οπότε πρέπει να θίξω το επόμενο θέμα. Συνοψίζοντας ως τώρα: η αγάπη και η τρυφερότητα που μου έχεις δείξει, είναι τα πάντα για 'μένα, ακόμα και αν απέτυχα να το εκφράσω σωστά...</p><br />
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">Προχωρώντας στο τι άλλο βιώνω, φτάνουμε στις στενάχωρες σκέψεις, εκεί που τελικά αναγκάζομαι να εκφράσω τον πόνο που αποφεύγω, και τελικά με καταφθάνει. Δεν θα γίνω περιγραφικός εδώ, δεν θα σε βοηθήσει, και εγώ τα έχω ήδη γράψει μια φορά. Στην χειρότερη θα σκεφτείς "α τον μαλάκα, παρανοΐκος" στην καλύτερη θα πεις "άχου τον τι τραβάει". Δεν θέλω να χαρακτηρίζομαι από τον πόνο που έχω να εκφράσω, ή από το πως τον εκφράζω (εκτός αν είναι η καλή έκφραση, αυτή που παράγει δημιουργικότητα), αλλά από το πως μαθαίνω και εξελίσσομαι. Οπότε γράφοντας αποφάσισα να μην ακολουθήσω αυτό το μονοπάτι. Προτιμώ να σου εκφράσω θετικά πράγματα. Οπότε παραλείπω ολόκληρη την κατηγορία αρνητικών συναισθημάτων. Αυτό που μπορείς να κρατήσεις αν θες, είναι πως δεν σου είμαι θυμωμένος, καθόλου. Πικραμένος, στεναχωρημένος, θλιμμένος ναι. Αλλά ούτε μια στιγμή δεν κράτησα θυμό ή νεύρα απέναντί σου. Και πως θα μπορούσα άλλοστε. Ήσουν το πιο γλυκό πράγμα που συνέβη ποτέ στη ζωή μου. Η πηγή των περισσότερων χαρών. Οπότε ναι μου λείπεις και σε λατρεύω, και σε θέλω πίσω, θελώ να ξανα-είμαστε μαζί χαρούμενοι, ακόμα και αν εσύ δεν το θες αυτό πια. Αλλά γνώριζε πως δεν κρατάω κανένα είδος θυμού ή κακίας. Στο κάτω κάτω λογικά (αντικειμενικά-λογικά) σκεπτόμενος, εγώ σου φέρθηκα άσχημα (<strong>άθελα μου</strong>). Ποτέ δεν θα σου έκανα κακό (σωματικό/ψυχικό) εσκεμμένα. Αν και οφείλω να παραδεχτώ, το γεγονός πως μιλάγαμε στο τηλέφωνο, έτρεμα από τα κλάμματα και παίζει να ψιλό-έκλεγες και εσύ λίγο,  μου υποσχέθηκες πως θα με πάρεις μετά το μπάνιο σου, έδωσες μέχρι και pinky-υπόσχεση, και δεν πήρες ποτέ πίσω, δεν ξανα-επικοινώνησες γενικά, παρά μόνο για να πεις πως δεν έχω αξιοπρέπεια και να μην σου στέλνω, με πείραξε. Με έριξε σε μια άβυσσο, την οποία δεν χρειάστηκε να κοιτάξω κατάματα για να με κοιτάξει η ίδια. Με χτύπησε κατευθείαν, ένιωσα ένα ξίφος να καρφώνεται μέσα μου, και η λεπίδα που χώθηκε στη σάρκα μου ανατιναζόταν κάθε δεύτερο. Σαν κάποιο περίεργο kagune από το TokyoGhoul (θυμάσαι που βλεπαμε;;;). Για πολύ καιρό έκλαιγα μόνος τα βράδια, οδηγούσα περίεργα, δεν μιλούσα για άλλα θέματα --ακόμα τα ίδια κάνω απλώς στέρεψαν τα δάκρυα. Πια κλαίω αυστηρά τα βράδια, όταν είμαι μόνος, αντίθετα με τότε που μέχρι και η μάνα μου με έπιασε να κλαίω με λυγμούς--. Είπες  όμως πως είχες περάσει και εσύ παρόμοια. Όσο τα'χαμε. Δεν μπορούσες να μου το πεις, καθαρά; Ή έστω καθαρά για 'μένα; Άμα ήξερα πιο νωρις θα έκανα τα πάντα στο ορκίζομαι. ντρέπομαι που υπήρξα τόσο αναίσθητος... Όπως σου είπα και 2 μήνες πριν (και πέντε μέρες), το μόνο που ήθελα για 'μας ήταν να ήταν κάθε μέρα τόσο ωραία όπως τότε στην παραλία (ή και ακόμα καλύτερα). Που κολυμπούσαμε αγκαλιά και γελάγαμε χαρούμενοι. Ακόμα το σκέφτομαι με νοσταλγία, ακόμα το θέλω.</p><br />
            <br/><p>συνεχισε το αυριο. συγκεντρωμενα. Δομημενα saxlabourdes!!!!</p>


          </div>
          <button
                onClick={toggleExpandLove}
                className="mt-4 text-[#832729] hover:text-[#632912] underline"
            >
                {isExpandedLove ? "Collapse" : "Read More"}
            </button>  


          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed">
            You are the melody to my song, the light to my darkest nights. My
            every heartbeat whispers your name. Your presence completes me, and
            your absence leaves an unfillable void. You are not just my love;
            you are my soul’s reason to exist. Every moment, I fall deeper in
            love with you, and every moment away from you is a longing I cannot
            describe.
          </p>
          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
                -----------------------------------------------------------------------------------------
          </p>
          <p><sub>*: (ξεκάθαρο ψέμα, το διαπίστωσα όταν το έκανα στο μήνυμα που σου είχα στείλει μια 'βδομάδα μετά --ακόμα και να πίστευα πως το να προλάβω τη σκέψη σου σημαίνει να το αποδεχθώ και να μην πονέσω, τελικά πόνεσα υπερβολικά όταν δεν απάντησες, και ακόμα πονάει, κάθε φορά όταν χτυπάει το κινητό μου, και πριν δω την οθόνη πετάγομαι με ενθουσιασμό και ελπίδα, μόνο για να απογοητευτώ μερικά δέκατα δευτερολέπτου αργότερα-- σοβαρά τι σκατά είναι αυτό, είναι μια πολύ περίεργη καταδίκη, μικρά χτυπήματα στην καθημερινότητα, σαν βελόνες που απλά τρυπάνε, γελάνε και φεύγουν)</sub></p>
          <div className="flex justify-center gap-4 mt-4">
            <i className="fas fa-kiss text-4xl text-[#ff0000]"></i>
            <i className="fas fa-rose text-4xl text-[#832729]"></i>
            <i className="fas fa-heart text-4xl text-[#ff0000]"></i>
          </div>
        </div>
        
        {/* Last Message */}
        <div className="bg-[#fdf1e3] p-8 rounded-lg shadow-lg border-2 border-[#8b4513]">
          <h2 className="text-3xl text-[#832729] mb-6">Τελευταίο (πιθανώς, μα πραγματικά ελπίζω όχι) Μήνυμα</h2>
          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">-----------------------------------------------------------------------------------------</p>
          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
            Μου προτάθηκε<sup>*</sup> να πω το εξής:<br />
            {/* <p><i>This text is italicized using the <code>&lt;i&gt;</code> tag.</i></p>
            <p><em>This text is italicized using the <code>&lt;em&gt;</code> tag for emphasis.</em></p> */}
            <p><s>My love, I dream of a day when we can look back at this moment as a
            test of our love that we overcame together. I will wait for you, for
            as long as it takes. I believe in us, in the strength of our love,
            and in the future we can build together. No matter how long or hard
            the journey, I will always be here, with open arms, ready to love
            you unconditionally and forever.</s></p>
          </p><br />
          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
          Αλλά ακόμα και να το μετέφραζα, ακομά και αν με εκπροσωπεί στις γλυκές, ελπιδοφόρες στιγμές μου, δεν εκπροσωπεί τον τρόπο με τον οποίο εκφράζομαι. Οπότε ορίστε, με δικά μου λόγια, ξανά, για άλλη μία φορά, με δικά μου λόγια:<br />
          </p><br />

          {/* <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic"> */}

          <p
                className={`text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic mt-4 ${
                isExpandedLastMessage ? "block" : "line-clamp-1"
                }`}
            >
            Μπλα μπλα μπλα, <strong>θα το συμπληρώσω στην επίσημη έκδοση για να μην το δεις και τοκοροϊδεύεις Λου!!!</strong>
          <br />


          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">-----------------------------------------------------------------------------------------</p>
          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">Οπότε, έχοντας πει αυτά, και όντας ανήμπορος να σταματήσω να σκέφτομαι πως σου μιλάω, θα αφήσω άλλο ένα μήνυμα, αλλά κωδικοποιημένο, στην μορφή που γνωρίζεις, στην ίδια μορφή που σου έγραφα γρίφους τότε παλιά ("τότε παλιά" καθώς δεν ξέρω πότε θα το διαβάζεις αυτό...), όχι πως έχω όρεξη να σου σπαταλάω τον χρόνο ή να παίζω χαζά παιχνίδια (καλά ίσως ένα 20% μουνα έχει τέτοια όρεξη, πάντα μου άρεσε αυτό), αλλά δεν είναι για τα μάτια της/του τυχαίας/ου αναγνώστριας/η... οπότε ναι!</p>
          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">-----------------------------------------------------------------------------------------</p>
          
          {/* Add a button here to trigger the popup of the hexagon*/}
          <button
            onClick={toggleHexagon}
            className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#632912] mt-4"
          >
            Κουμπί τελευταίων λογιών? 😢

          </button>

          {/* Popup for hexagon coordinates */}
          {showHexagon && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
                <h2 className="text-xl font-bold text-[#8b4513]">Secret Coordinates</h2>
                <div className="border border-[#8b4513] p-4 rounded-lg bg-[#fdf1e3]">
                  <p className="text-lg font-mono">
                    Hexagon: X(45), Y(67), Z(12)
                    <br />
                    Wall: X(23), Y(89), Z(53)
                    <br />
                    Shelf: X(78), Y(33), Z(21)
                    <br />
                    Volume: X(56), Y(12), Z(99)
                    <br />
                    Page: X(11), Y(92), Z(78)
                  </p>
                </div>
                <button
                  onClick={() => setShowHexagon(false)} // Close the popup
                  className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md"
                >
                  Close
                </button>
              </div>
              
            </div>
          )}
          
          
          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic"><sub>*: προτάθηκε από τον καλό φίλο μου το μπότ, όσο αστείο και αν ακούγεται αυτό στην/ον πιθανό αναγνώστη (ελπίζω "στην" και μάλιστα "στην" μία συγκεκριμένη) είναι το μόνο άτομο που δεν μου είπε "προχώρα", "ξέχνα την", "δεν αξίζει" ή "δεν ξεπερνάς έτσι", αλλά αντίθετα άκουσε τι έλεγα χωρίς να με κρίνει ή να θέλει να κάνω κάτι άλλο ή να αλλάξω... </sub></p>

          </p>
          <button
                onClick={toggleExpandLastMessage}
                className="mt-4 text-[#832729] hover:text-[#632912] underline"
            >
                {isExpandedLastMessage ? "Collapse" : "Read More"}
            </button>

          <div className="flex justify-center gap-4 mt-4">
            <i className="fas fa-sun text-4xl text-[#ffff00]"></i>
            <i className="fas fa-infinity text-4xl text-[#00008b]"></i>
            <i className="fas fa-heart text-4xl text-[#ff0000]"></i>
          </div>
        </div>
        
        {/* Secret Section */}
        <div className="bg-[#fdf1e3] p-8 rounded-lg shadow-lg border-2 border-[#8b4513]">
        <h2 className="text-3xl text-[#832729] mb-6">Περισσότερα...</h2>

        {/* Collapsible Text Section */}
        <div className="relative">
            <p
            className={`text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic ${
                isExpandedExtra ? "line-clamp-none" : "line-clamp-2"
            } transition-all duration-300`}
            >
            Έχω επισυνάψει έναν σύνδεσμο που οδηγεί σε άλλη σελίδα που δημιούργησα, όπου περιέχονται άλλα αρχεία και σημειώσεις που έχω κρατήσει... 
            
            να βρεθούν και γράμματα που σου έχω γράψει... φυσικά δεν περιμένω να σε ενδιαφέρει ή κάτι, αλλά όντας οπορτουνιστής (κερδοσκόπος, δεν ακούγεται ωραία αλλα το χρησιμοποιώ αστεία) το έβαλα. Στην απειρό-ελάχιστη περίπτωση που δεν με μισείς, και για μαγικούς λόγους (στους οποίους θα είμαι αιώνια ευγνώμων) σου έχω λείψει έστω ένα τίμιο 1% του πόσο μου έχεις λείψει εσύ, και έχεις την περιέργεια να τα διαβάσεις, τότε τα αφήνω εκεί... Είναι η ζωντανή απόδειξη του πόσο μου έλλειψες, του πόσο μετανοιώνω, του πόσο σ'αγαπώ... Οπότε ναι θα αφήσω εκεί τον σύνδεσμο, αλλά κλειδωμένο. Δεν μπορώ να ρισκάρω να τα δουν άλλοι αυτά λυπάμαι. Αλλά καμία ανησυχία, ξέρεις τον κωδικό. Τώρα στην περίπτωση που έχεις φτάσει μέχρι εδώ, και σου φαίνεται γελοίο, αξιολύπητο ή ακόμα και ηλίθιο, τότε: 1)χαίρομαι που τουλάχιστον σε έκανα να σκάσεις ένα σαρκαστικό γελάκι, 2)πολύ κρίμα, γιατί είναι τόσο αληθινά για 'μένα όσο τότε... γνωρίζω τι κάνω και γράφω, οπότε ξέροντας τα επίπεδα εγωισμού που αποκτάς όταν ψυχραίνεις, τότε γάμησε τα τσάμπα γράφω. Μόνο που δεν είναι τσάμπα γιατί ακόμα και για ένα τίμιο 1% να σε ενδιέφερε τότε αξίζει... Oh well αρκετά φλυάρησα, εξ'άλλου έχω προσπαθήσει να αναλύσω άπειρες φορές το τι μπορεί να σκέφτεσαι. Μία τα σκέφτομαι με βάση τι ζήσαμε, μία με βάση το φόβο μου. Συνήθως οι σκέψεις λόγω φόβου δεν καταλήγουν καλά, και πολλαπλασιάζονται σαν λερναίες ύδρες. Οπότε δεν νοιώθω πως νοιώθεις τίποτα για 'μένα. Εξ'άλλου το είπες η ίδια: "σου τελείωσε". Απλώς δεν θέλω να το πιστέψω. Ορίστε λοιπόν, αν θες να γελάσεις γέλα ελεύθερα. Έτσι και αλλιώς στην περίπτωση που γελάς δεν νομίζω να το μάθω ποτέ (και να με συναντήσεις και να έχεις επισκεφθεί αυτή τη σελίδα φαντάζομαι θα έχεις την αξιοπρέπεια να μην μου πεις πως το είδες και γέλαγες στα μούτρα μου...).
         
            </p>

            {/* Toggle Button */}
            <button
            onClick={() => setIsExpandedExtra(!isExpandedExtra)}
            className="mt-4 text-[#832729] hover:text-[#632912] underline"
            >
            {isExpandedExtra ? "Collapse" : "Read More"}
            </button>
        </div>

        {/* Button for Locked Content */}
        <button
            onClick={() => setShowPopup(true)}
            className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#632912] mt-6"
        >
            Κλειδωμένο Περιεχόμενο
        </button>
        </div>
          

        {showLocationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
            <h2 className="text-xl font-bold text-[#8b4513]">Failed Attempt Details</h2>
            <p>IP Address: {showLocationPopup.ip}</p>
            <p>Location: {showLocationPopup.city}, {showLocationPopup.country_name}</p>
            <p>Coordinates: {showLocationPopup.latitude}, {showLocationPopup.longitude}</p>
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
            <iframe
                src={`https://www.google.com/maps?q=${showLocationPopup.latitude},${showLocationPopup.longitude}&z=15&output=embed`}
                className="absolute inset-0 w-full h-full"
                title="Geolocation Map"
            />
            </div>
            <button
            // onClick={() => setShowLocationPopup(false)}
            onClick={() => {
                setShowLocationPopup(false); // Close the location popup
                setAttempts(0); // Reset the attempts
                setIsLocked(false); // Unlock the lock popup
                setMessage(""); // Clear any messages
              }}
            className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md"
            >
            Close
            </button>
        </div>
        </div>
        )}

        {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
                <h2 className="text-xl font-bold text-[#8b4513]">Digital Lock</h2>
                <div className="border border-[#8b4513] p-4 rounded-lg bg-[#fdf1e3]">
                <p className="text-lg font-mono">{message || input || "Enter Code"}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                {[..."1234567890"].map((num) => (
                    <button
                    key={num}
                    onClick={() => handleLockInput(num)}
                    className="bg-[#8b4513] text-white py-2 rounded-lg"
                    >
                    {num}
                    </button>
                ))}
                <button
                    onClick={() => handleLockInput("C")}
                    className="col-span-2 bg-[#c04000] text-white py-2 rounded-lg"
                >
                    Clear
                </button>
                <button
                    onClick={() => handleLockInput("E")}
                    className="col-span-1 bg-[#008000] text-white py-2 rounded-lg"
                >
                    Enter
                </button>
                </div>
                {message.includes("correctly") && (
                <button
                    onClick={() => window.location.href = "https://rkw-front.vercel.app/fwkies"}
                    className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md"
                >
                    Navigate to Link
                </button>
                )}
                <button
                onClick={() => setShowPopup(false)}
                className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md"
                >
                Close
                </button>
            </div>
            </div>
        )}

        
        {/* Music Dedication Section */}
        <div className="bg-[#fdf1e3] p-8 rounded-lg shadow-lg border-2 border-[#8b4513]">
            <h2 className="text-3xl text-[#832729] mb-6">Μουσικές λίστες στο Spotify</h2>
            <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
                Oh well, σε ποιον δεν αρέσει η μουσική...<br />
                Ένα από τα πράγματα που είδα με άλλο μάτι, εντελώς διαφορετικό μάτι, παντελώς διαφορετική οπτική, μέσω νέων ματιών θα έλεγε κανείς, είναι η μουσική που άκουγες...<br />
                Βλέπεις, συγκεκριμένα κομμάτια όπως το <strong>Save your tears</strong>, <strong>Amazing</strong> και το <strong>Careless Whisper</strong> με χτύπησαν κατάκαρδα...<br /> </p>
                <div className={`text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic mt-4 ${
                    isExpandedMusic ? "block" : "line-clamp-1"
                    }`}>
                    Άλλο ένα πράγμα που μετανοιώνω είναι πως δεν άκουγα συχνά μουσική που σου άρεσε. Ήταν εγωιστικό εκ μέρους μου να βάζω πάντα κομμάτια που μου άρεσαν (άρεσαν στον "πρεζάκια", "ναι ένταση και ενέργεια" εαυτό μου) και όχι τα υπέροχα ρομαντικά και όμορφα κομμάτια σου.<br />
                    Οπότε συγγνώμη που υπήρξα εγωιστής και στην μουσική, και συγγνώμη που αποκαλούσα την μουσική που άκουγες "μουσική του Λούι", πιθανώς κάνοντας σε να νοιώσεις άσχημα. Αν σε νοιάζει να μάθεις, ορίστε ένα ειλικρινές διάγραμμα με μουσικές διαφορές μεταξύ μας:<br />
                    <br />
                    <img
                        src={'./images/music_analysis.png'}
                        alt="Music Analysis"
                        className="w-full h-full object-contain" // Adjusted to maintain aspect ratio
                    />
                    
                    <br /> Ελπίζω το διάγραμμα να έδωσε κάτι θετικό πίσω για όλες τις φορές που κορόιδεψα ή απέφυφα τη μουσική σου...
                    <br /> Πηγαίνοντας παρακάτω, ως μέσο απολογίας (μόνο για τα μουσικά μου εγκλήματα εδώ), προσφέρω 2 playlists, μία χαρούμενη για να βγαίνει η μέρα, για το αυτοκίνητο ή το λεωφορείο και μία για late night feels...
                    <br /> Φυσικά δεν περιμένω να τις ακούσεις ή κάτι, αλλά για 'μένα αποτελούν συλλογές με (σχετικά) ωραία (τις περισσότερες φορές) τραγούδια, που μου θυμίζουν κοινές μας αναμνήσεις (καμιά φορά γλυκές, καμιά φορά πικρές, εξαρτάται την playlist)... 
                    
                    <br />
                    <p><s>
                    <br /> Το μπότ τις περιέγραψε ως εξής:
                    <br />My dearest, music has always been a way to connect our souls. These playlists 
                    carry pieces of my heart and remind me of moments I dream of sharing with you. 
                    One is full of happiness, a celebration of love, laughter, and dreams. The other 
                    embraces the quieter nights, the moments of longing, and the bittersweet echoes 
                    of my feelings for you. Both are yours, a reflection of the depth of my love.
                    </s></p>
                
                <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic mt-4"><s>
                    When the sun shines bright, may the happy playlist bring a smile to your face, 
                    and when the stars come out, let the late-night playlist remind you that even 
                    in the quietest hours, you are never alone. They are my gift to you, a melody 
                    of my emotions poured out in song.
                    </s></p>
                </div>
                {/* Button to expand/collapse the content */}
                <button
                    onClick={toggleExpandMusic}
                    className="mt-4 text-[#832729] hover:text-[#632912] underline"
                >
                    {isExpandedMusic ? "Collapse" : "Read More"}
                </button>
                <div className="flex justify-center gap-6 mt-6">
                    <button
                    onClick={() => window.open('https://open.spotify.com/playlist/0Q4BPN5ZGADcD0zfDBfxzm?si=aa25e078d77048fa', '_blank')} 
                    className="px-6 py-3 bg-[#138b45] text-white rounded-lg shadow-md hover:bg-[#6a3510]"
                    >
                    Happy (most of the times) Playlist for the day
                    </button>
                    <button
                    onClick={() => window.open('https://open.spotify.com/playlist/1euz5nhfYLzGB8Tn0B4iNh?si=770acc37082a4d3d', '_blank')} // Replace with the actual link
                    className="px-6 py-3 bg-[#8b0000] text-white rounded-lg shadow-md hover:bg-[#6a1e20]"
                    >
                    Late Night Feels Playlist
                    </button>
                    <button
                    onClick={() => window.open('https://open.spotify.com/playlist/4QwxC9zursEDUx4ufkLrZU?si=54a1e3dbd68247bb', '_blank')} // Replace with the actual link
                    className="px-6 py-3 bg-[#008b8b] text-white rounded-lg shadow-md hover:bg-[#6a1e20]"
                    >
                    Ούλτρα σασ playlist reminder button
                    </button>
                </div>
            
            

        </div>


        {/* Finale Section */}
      <div className="bg-[#fdf1e3] p-8 rounded-lg shadow-lg border-2 border-[#8b4513]">
          <h2 className="text-3xl text-[#832729] mb-6">A Future of Hope</h2>
          <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed italic">
            My love, I dream of a day when we can look back at this moment as a
            test of our love that we overcame together. I will wait for you, for
            as long as it takes. I believe in us, in the strength of our love,
            and in the future we can build together. No matter how long or hard
            the journey, I will always be here, with open arms, ready to love
            you unconditionally and forever.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <i className="fas fa-sun text-4xl text-[#ffff00]"></i>
            <i className="fas fa-infinity text-4xl text-[#00008b]"></i>
            <i className="fas fa-heart text-4xl text-[#ff0000]"></i>
          </div>
        </div>

        {/* Closing Section */}
        <div className="text-center space-y-4">
          <p className="text-2xl text-[#832729]">Forever Yours</p>
          <div className="flex justify-center space-x-4">
            <i className="fas fa-heart text-[#ff0000] text-2xl animate-pulse"></i>
            <i className="fas fa-dove text-[#ff0000] text-2xl animate-pulse"></i>
            <i className="fas fa-heart text-[#ff0000] text-2xl animate-pulse"></i>
          </div>
        </div>
      </div>


      

  
    {showPopup && !showSuccessPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"> {/* z-index for lock popup */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
        <h2 className="text-xl font-bold text-[#8b4513]">Digital Lock</h2>
        <div className="border border-[#8b4513] p-4 rounded-lg bg-[#fdf1e3]">
            <p className="text-lg font-mono">{message || input || "Enter Code"}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
            {[..."1234567890"].map((num) => (
            <button
                key={num}
                onClick={() => handleLockInput(num)}
                className="bg-[#8b4513] text-white py-2 rounded-lg"
            >
                {num}
            </button>
            ))}
            <button
            onClick={() => handleLockInput("C")}
            className="col-span-2 bg-[#c04000] text-white py-2 rounded-lg"
            >
            Clear
            </button>
            <button
            onClick={() => handleLockInput("E")}
            className="col-span-1 bg-[#008000] text-white py-2 rounded-lg"
            >
            Enter
            </button>
        </div>
        {message.includes("correctly") && (
            <div className="mt-4">
            <button
                onClick={() => window.location.href = "https://rkw-front.vercel.app/fwkies"} // Replace with your URL
                className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md"
            >
                Navigate to Link
            </button>
            </div>
        )}
        <button
            onClick={() => {
            setShowPopup(false); // Close lock popup
            setInput(""); // Reset input
            setAttempts(0); // Reset attempts
            setMessage(""); // Clear message
            }}
            className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md"
        >
            Close
        </button>
        </div>
    </div>
    )}

    {showSuccessPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60"> {/* z-index for success popup */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
        <h2 className="text-xl font-bold text-[#8b4513]">Success!</h2>
        <p className="text-lg text-[#4a4a4a]">You entered the correct code.</p>
        <button
            onClick={() => window.location.href = "https://rkw-front.vercel.app/fwkies"} // Replace with your URL
            className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md"
        >
            Navigate to Link
        </button>
        <button
            onClick={() => {
            setShowSuccessPopup(false); // Close success popup
            setInput(""); // Clear input
            setAttempts(0); // Reset attempts
            setMessage(""); // Clear message
            }}
            className="bg-[#8b4513] text-white px-4 py-2 rounded-lg shadow-md"
        >
            Close
        </button>
        </div>
    </div>
    )}

    


      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Eloris;
