import React, { useState } from 'react';

const SeatRotation = () => {
  const [solution, setSolution] = useState(null);

  return (
    // Background image applied here to the whole page
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/gamiseta.png')", // Correct path for public folder
      }}
    >
      <div className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-lg my-10">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-8">
          🚗💺 Δίκαιη Κατανομή Καθισμάτων & Οδηγών! 💺🚗
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Ποιος κάθεται μπροστά; Ποιος οδηγεί; Ας δούμε πώς μπορούμε να μοιράζουμε δίκαια τις θέσεις και τη σειρά των οδηγών, για να μην υπάρχει κανένας αδικημένος. 😎 UwU
        </p>
        <p className="text-lg text-gray-700 text-center mb-8">
          Τα χρωματιστά πλαίσια με τα γράμματα που λένε "Λύση" συχνά είναι κουμπιά πατήστε τα <b>άφοβα</b>!!!
        </p>

        {/* Buttons for Selecting Solutions */}
        <div className="flex justify-center space-x-4 mb-10">
          <button
            onClick={() => setSolution(1)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Λύση 1: Εναλλαγή Θέσεων
          </button>
          <button
            onClick={() => setSolution(2)}
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Λύση 2: Κυκλικός Αλγόριθμος
          </button>
          <button
            onClick={() => setSolution(3)}
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Λύση 3: Διόρθωση με Cache
          </button>
        </div>

        {/* Solution 1: Simple Rotation */}
        {solution === 1 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-pink-500 mb-4">
              Λύση 1: Εναλλαγή Θέσεων ανά Ταξίδι
            </h2>
            <p className="text-gray-700 mb-4">
              Σε αυτή τη λύση, οι δύο που δεν οδηγούν εναλλάσσουν τις θέσεις τους μπροστά και πίσω σε κάθε ταξίδι.
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Παράδειγμα:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><b>Ταξίδι πρώτο</b>: Η <b>φώκια</b> οδηγάει, ο <b>Φώτης</b>κάθεται μπροστά, ο <b>Χρήστος</b> πίσω.</li>
              <li><b>Ταξίδι δεύτερο</b>: Η <b>φώκια</b> οδηγάει, ο <b>Χρήστος</b>κάθεται μπροστά, ο <b>Φώτης</b> πίσω.</li>
              <li><b>Κοινώς όταν οδηγάει ο Χ κάθεται συνοδηγός ο άλλος από τους 2 που δεν έκατσε την προηγούμενη φορά... και όλοι είμαστε χαρούμενοι!!!</b></li>
            </ul>
            <p className="text-gray-700">
              Πρόβλημα: τι γίνεται αν οδηγεί πολλές φορές το ίδιο άτομο? Δείτε Λύση 2 γι'αυτό (και επειδή μπήκα στον κόπο να σχεδιάσω την αυτιστική ντελούλου αυτή σελίδα 😎 UwU
            </p>
          </div>
        )}

        {solution === 2 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
            Λύση 2: Κυκλικός Αλγόριθμος με Modulo (Delulu Mode On)
            </h2>
            <p className="text-gray-700 mb-4">
            ΟΚ, τι γίνεται τώρα όταν το πράγμα αρχίζει να μπλέκεται και κανείς δεν καταλαβαίνει τι γίνεται; Αν νομίζεις πως το σύστημα μας δε θα αντέξει αυτήν την καταιγίδα των αλλαγών, άκου: Εδώ εφαρμόζουμε έναν κυκλικό αλγόριθμο με modulo. Αυτό σημαίνει πως η σειρά οδηγών είναι καθορισμένη με έναν υπερβολικά λογικό τρόπο: <b>A → B → Γ</b> και δεν υπάρχει επιστροφή. 😎
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Παράδειγμα:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><b>Ταξίδι πρώτο</b>: Η <b>φώκια</b> οδηγάει, ο <b>Φώτης</b> κάθεται μπροστά, ο <b>Χρήστος</b> πίσω.</li>
            <li><b>Ταξίδι δεύτερο</b>: Ο <b>Φώτης</b> είναι στη θέση του οδηγού, ο <b>Χρήστος</b> μπροστά και η <b>φώκια</b> πίσω.</li>
            <li><b>Ταξίδι τρίτο</b>: Ο <b>Χρήστος</b> αναλαμβάνει το τιμόνι και η <b>φώκια</b> παίρνει τη θέση του συνοδηγού - όπως πρέπει!!! 💪</li>
            </ul>
            <p className="text-gray-700">
            Το καλύτερο μέρος είναι ότι, αν η σειρά αλλάξει "κατά λάθος" (π.χ. <b>A → Γ → B</b>, και ο κόσμος καταρρέει), απλά το αγνοούμε και πάμε με τον κανονικό κύκλο! 🌀
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Η Μαθηματική Φόρμουλα (Autism & Delulu Style):</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Ο οδηγός για το ταξίδι <i>t</i>: <code>Driver(t) = t % 3</code> (Γιατί μόνο 3 άτομα και μόνο αυτοί που γνωρίζουν το σωστό κύκλο επιβιώνουν, ok?).</li>
            <li>Ο επιβάτης μπροστά για το ταξίδι <i>t</i>: <code>Passenger(t) = (t + 1) % 3</code> (Πρέπει να τηρηθεί η σειρά ή θα καταστραφεί το σύμπαν! 😱).</li>
            <li>Βοηθητική σημείωση γιατί το έκαψα: η συνάρτηση από πάνω βγάζι πάντα 0,1,2, όπου 0 ο Α, 1 ο Β και 2 ο Γ, <b>gege</b> τώρα? το πιάσαμε? (nah i'd win aaaaaah moment).</li>
            <li>Βοηθητική σημείωση No.2 γιατί το έκαψα: Αν η σειρά οδηγών χωρίσει απλώς κάνουμε υποχωρήσεις και αλλαγές για να την διορθώσουμε. Το point είναι πώς όσο οδηγάν και οι 3 από μία φορά αν 3 βόλτες είμαστε καλά. Τώρα αν γίνουν επαναλήψεις τύπου ΑΒΒΓ αντί για ΑΒΓ τότε... διαβάστε Λύση 3!!!</li>
            </ul>
            <p className="text-gray-700">
            Τέλος, μην ξεχνάτε, αν το σύστημα πάει λάθος, το καταγράφουμε και συνεχίζουμε με την κανονική σειρά! 📜
            </p>
        </div>
        )}

        {/* Solution 3: Correction with Cache, aka "The Perfectly Fair Fix, Yasss!" */}
        {solution === 3 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
            Λύση 3: Διόρθωση διατηρώντας σειρά στον κατάλογο των χαμένων σειρών!!! (Η μαγική συνταγή για παντοτινή δικαιοσύνη)✨
            </h2>
            <p className="text-gray-700 mb-4">
            Αν κάποιος οδηγήσει δύο φορές συνεχόμενα, τότε το καταγράφουμε στον <i>μαγικό κατάλογο</i> (μην ανησυχείς, θα αγνοήσουμε την αδικία σαν να μην έγινε ποτέ 😇).
            </p>
            <p className="text-gray-700 mb-4">
            Την πρώτη φορά που συμβαίνει επανάληψη οδηγού (aka το πρώτο έγκλημα), το καταγράφουμε και οι υπόλοιποι θα επιλέξουν ποιος θα κάθεται μπροστά μέσω... <i>πέτρας, ψαλιδιού και χαρτιού</i>. Όχι, δεν είναι αστείο, το εννοούμε. ✂️🧑‍⚖️
            </p>
            <p className="text-gray-700 mb-4">
            Από εκεί και πέρα, έχουμε φτιάξει ένα καταπληκτικό αρχείο (αχ, τα αρχεία μας ✨), το οποίο μας λέει ποιος κάθισε τελευταίος μπροστά σε κάθε αμάξι, ώστε να ξέρουμε ακριβώς ποιος δεν θα κάθεται μπροστά αυτήν τη φορά. 
            </p>
            <p className="text-gray-700 mb-4">
            Εννοώ... αν η <b>φώκια</b> οδηγήσει 5 φορές κατά λάθος, τότε συνοδηγός την πρώτη φορά θα είναι ο <b>Φώτης</b> (τυχαία), μετά ο <b>Χρήστος</b>, και μερικές φορές θα είναι ο <b>Χρήστος</b> και άλλες ο <b>Φώτης</b>... Απλά αποδεχτείτε το, είμαστε όλοι ευτυχισμένοι και ευλογημένοι! 🙌
            </p>
            <p className="text-gray-700 mb-4">
            -Όχι, η σειρα θα τηρηθεί πάνω θα ήταν Φώτης (έστω πως βγάζει χαρτί και νικάει Χρήστο που έχει τάση για γροθιές (πέτρες)) μετά Χρήστος μετά Φώτης μετά Χρήστος μετά φώτης και η επόμενη θα ήταν Χρήστος...
            </p>
            <p className="text-gray-700 mb-4">
            <b>Να σημειωθεί πως οι σειρές σε τέτοιες "έκτατες" περιστάσεις δεν επηρεάζουν τις σειρές στους κύκλους οδηγών/συνοδηγών της Λύσης 2!!!</b>
            </p>

            <h3 className="text-xl font-bold text-gray-800 mb-3">Παράδειγμα:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><b>Βαριέμαι να το γράψω, Ελπίζω να καταλάβατε</b></li>
            <li>🤡🤡🤡</li>
            </ul>
            <p className="text-gray-700">
            Στο τέλος, το σύστημα διορθώνει αυτόματα τη σειρά, έτσι κανείς δεν μένει παραπονεμένος και όλοι αισθάνονται σαν βασιλιάδες του (<b>delulu</b>) κόσμου τους. 👑🚗
            </p>
        </div>
        )}


        <div className="border-t border-gray-300 mt-8 mb-8"></div>

        
      </div>
    </div>
  );
};

export default SeatRotation;
