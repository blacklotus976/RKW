import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Fwkia() {
  const navigate = useNavigate();

  const handleViewInBookReader = (extraPath) => {
    const params = new URLSearchParams();
    params.set('filePath', extraPath);
    params.set('reloaded', "false");
    navigate(`/book?${params.toString()}`);
  };

  const [selectedChapter, setSelectedChapter] = useState(null);
  let isZografiesRendered = false;


  const bookData = {
    title: "Sorrows of the Midnight Soul",
    chapters: [
      {
        title: "Εισαγωγή",
        // pdf: './pdfs/fwkies/ΕισαγωγικόΣημείωμα.pdf',
        description: "Περιέχει αφιέρωση και εισαγωγικό σημείωμα.",
        text: "Αγαπητέ (όχι εκτός αν σε λένε Λούι, Έλορη ή Νέστορα) σε καλωσορίζουμε σε αυτή τη (ο Θεός να την κάνει) συλλογή...",
        // images: [
        //   "./images/bittersweet_edited4.png",
        //   "./images/bittersweet_edited2.png",
        //   "./images/bittersweet_edited3.png"
        // ],
      },
      {
        title: "Πίνακας Περιεχομένων",
        // pdf: './pdfs/fwkies/Περιεχόμενα.pdf',
        description: "Γενική δήλωση της δομής της συλλογής.",
        text: "Να σημειωθεί πως η ανάλυση του πίνακα περιεχομένων σε αυτό το pdf φτάνει το μέγιστο βάθος υποκεφαλαίων που υπάρχουν, αντίθετα με το γενικό ευρετήρι πιο πάνω (ολικό βάθος τάξης 2)...",
      },
  
      // Part A: Ιστορίες, Ιδέες και Απόψεις Μαύρου Λωτού
      {
        title: "Μέρος Α: Ιστορίες, Ιδέες και Απόψεις Μαύρου Λωτού",
        description: "Ανάλυση των κοινωνικών και φιλοσοφικών θεμάτων.",
        subsections: [
          {
            title: "1. Περί Κοινωνίας",
            description: "Ανάγκη, Εξουσία, Ιεραρχία, Αλλαγή",
            text: "Ανάλυση της ανάγκης για κοινωνία και της εξουσίας που την διέπει. Ακολουθεί γενική εισαγωγή και μετά ειδικότερα θέματα...",
            subsubsections: [
              {
                title: "1.1 Περί Εξουσίας και Άσκησής της",            
              },
              {
                title: "1.2 Περί Ιεραρχίας και Νόμων",
              },
              {
                title: "1.3 Περί Αλλαγής",
              },
              {
                title: "1.4 Επιπρόσθετα",
                description: "Πρόσθετα κείμενα και απόψεις για ψυχαγωγικούς λόγους",
              }
            ],
          },
          {
            title: "2. Περί Υπάρξεως",
            description: "Εξερεύνηση της φύσης της ύπαρξης και του νοήματος.",
            text: "Σκέψεις για την ανθρώπινη ύπαρξη, τη φύση της ψυχής και τη ματαιότητα του νοήματος.",
            subsubsections: [
              {
                title: "2.1 Περί Κόσμου",
                description: "Σχετικά με την κατάσταση του κόσμου",
                text: "Τι είναι ο κόσμος, δημιουργήθηκε ποτέ, είναι αέναος, ποια η ιεραρχία του και ποιο το νόημα του;",
                
              },
              {
                title: "2.2 Περί Ανθρώπινης Φύσεως",
                description: "Η σχέση μεταξύ συνείδησης και ύπαρξης.",
                text: "Πως γνωρίζουμε κάτι, γιατί καταλαβαίνουμε, σε τι μορφή υπάρχουμε, τι είμαστε...",
              },
              {
                title: "2.3 Περί Νοήματος της Υπάρξεως",
                description: "Πρόχειρη ανάλυση διάφορων φιλοσοφικών τάσεων",
                text: "Τι αξίζει, τι αξίζουμε, γιατί αξίζουμε;",
              }
            ],
          },
          {
            title: "3. Περί Βίου",
            description: "Συναισθήματα, λογική και τρέλα.",
            text: "Ανάλυση της συναισθηματικής και λογικής κατανόησης της πραγματικότητας.",
            subsubsections: [
              {
                title: "3.1 Περί Συναισθημάτων",
                description: "Τι επηρεάζει  τον συναισυηματικό κόσμο και συμβολή του στην λήψη αποφάσεων",
              },
              {
                title: "3.2 Περί Λογικής",
                description: "Διάφορες εκφάνσεις του Ορθού",
                text: "Γιατί διαφωνούμε, γιατί συμφωνούμε και τι ισχύει τελικά σε μια κατάσταση",
              },
              {
                title: "3.3 Περί Τρέλας",
                description: "Αγαπημένο μου Κεφάλαιο, και επίσης το πιο αναλυμένο",
                text: "Σχιζοφρένεια, υπέρβαση, υπεράνθρωπος, ανωτερότητα, ύβρις, αυθαιρεσία, και άλλα πολλά...",
              },
              {
                title: "3.4 Περί Απομόνωσης",
                description: "Προσπάθεια ανθρώπου να υπάρξει ταπεινά",
              },
              {
                title: "3.5 Περί Ανταγωνισμού και Συντροφικότητας",
                description: "Κίνητρο για δύο",
              }
            ],
          },
          {
            title: "4. Επιπρόσθετα/Διάφορα",
            description: "Ελεύθερα κείμενα, ακατάτακτες σημειώσεις και ζωγραφιές",
          },
        ],
      },
  
      // Part B: Πραγματικότητα, Μετάνοια και Κατανόηση Μαύρης Φώκιας
      {
        title: "Μέρος Β: Πραγματικότητα, Μετάνοια και Κατανόηση Μαύρης Φώκιας",
        description: "Ανασκόπηση των συναισθημάτων και της μετάνοιας.",
        subsections: [
          {
            title: "1. Περί Αγάπης και Τρυφερότητας",
            description: "Ανάλυση των ανθρώπινων συναισθημάτων.",
            text: "Πως η αγάπη και η τρυφερότητα επηρεάζουν την ανθρώπινη ύπαρξη.",
          },
          {
            title: "2. Ρομαντισμός και Αυθορμητισμός",
            description: "Σκέψεις για τον ρομαντισμό και την πραγματικότητα.",
            text: "Η σημασία του αυθορμητισμού στην ανθρώπινη ζωή και η απώλεια του έρωτα.",
          },
          {
            title: "3. Άτιτλο",
            subsubsections: [
              {
                title: "3.1 Πως είναι να νοιώθει κανείς άδειος",
              },
              {
                title: "3.2 Απόγνωση",
              },
              {
                title: "3.3 Μανία και Υποτονία",
              },
              {
                title: "3.4 Κατάθλιψη",
              },
              {
                title: "3.5 Τα Πάθη του Νεαρού Βέρθερου",
              },
              {
                title: "3.5 Η Γυναίκα του Ονείρου",
              },
              {
                title: "3.6 Mια πραγματικά Μικρή Ιστορία",
              },
              {
                title: "3.7: Mια πραγματικά Μικρή Ιστορία - Deutsch, mit Zeichnungen",
                pdf: './pdfs/fwkies/EineWirklichKurzeGesichteVersion1MitZeichnungen.pdf',
                extra_path: '/pragmatika_mikri_istoria.txt',
                // images: [
                //   "./images/bittersweet_edited4.png",
                //   "./images/bittersweet_edited2.png",
                //   "./images/bittersweet_edited3.png"
                // ],
              },
              {
                title: "3.8: Mια ιστορία Μεσαίου Μεγέθους - με ζωγραφιές",
                pdf: './pdfs/fwkies/ΜιαΙστοριαΜεσαιουΜεγεθους_μοντερναδικη_κυματαενοχων.pdf',
                extra_path: '/istoria_mesaiou_megethous.txt',
                // images: [
                //   "./images/bittersweet_edited4.png",
                //   "./images/bittersweet_edited2.png",
                //   "./images/bittersweet_edited3.png"
                // ],
              }
            ],
          },
          {
            title: "4. Αναδόμηση",
            subsubsections: [
              {
                title: "4.1 Αξία Ανάμνησηςς",
              },
              {
                title: "4.2 Παρελθόν εναντίον Παρόντος",
              },
              {
                title: "4.3 Πως να δημιουργήσεις μέσω του Πόνου",
              },
              {
                title: "4.4 Είναι Κόλλημα, Εμονή, Αγάπη ή Τιμή;",
              },
            ],
          },
          {
            title: "5. Περί Κοινωνίας (Δεύτερο Μέρος)",
          },
          {
            title: "6. Περί Ύπαρξης και Νοήματος (Δεύτερο Μέρος)",
          },,
          {
            title: "7. Ήσουν το μόνο που άξιζε",
          },
          {
            title: "8. Γράμματα (διάφορες επιστολές)",
          },
          ,
          {
            title: "9. Καλημέρα και Όνειρα Γλυκά",
          },
        ],
      },
  
      // Part C: Παράρτημα
      {
        title: "Μέρος Γ: Παράρτημα",
        description: "Σχόλια και ανασκοπήσεις.",
        subsections: [
          {
            title: "1. Σχόλια κατά την Συγγραφή",
            description: "Σκέψεις κατά τη διάρκεια της δημιουργίας.",
            text: "Οι προκλήσεις και οι προβληματισμοί που αναδύθηκαν κατά τη συγγραφή.",
          },
          {
            title: "2. Σχόλια ύστερα της Ολοκλήρωσης",
            description: "Ανασκόπηση μετά την ολοκλήρωση του έργου.",
            text: "Σκέψεις και συναισθήματα ύστερα από την ολοκλήρωση αυτής της προσπάθειας.",
          }
        ],
      }
    ]
  };


  const [isIndexExpanded, setIsIndexExpanded] = useState(false);

  const toggleIndex = () => {
    setIsIndexExpanded(!isIndexExpanded);
  };

  const renderPDFSections = (chapter) => {
    // const sections = [];

    // Check if chapter has a PDF
    const paintings = [
      "./images/bittersweet_edited4.png",
      "./images/final_bittersweet.png",
      "./images/bittersweet_edited3.png",
      "./images/final_drowning.jpg",
      "./images/schocked.png",
      "./images/reaching_out.jpg",
      "./images/yo.jpg",
      "./images/schocked2.png",
      "./images/cute_jojo.jpg",
      // "./images/drunk_jojo.png",
      "./images/akropolis.jpg",
    ]

    const sections = [];
    
    if (isZografiesRendered === false) {
      sections.push(
        <div key="paintings-section" className="bg-[#2c1810] p-10 rounded-lg shadow-lg mb-12">
          <h2 className="text-4xl text-[#f5c6aa] mb-6">Ζωγραφιές</h2>
          <div className="flex justify-center items-center mt-12 mb-12"> {/* Outer Ornate Frame */}
            <div className="relative bg-[#f4e6d6] p-6 rounded-[40px] shadow-lg border-[10px] border-[#a66a50]"> {/* Decorative Border with Heart Design */}
              <div className="relative p-4 rounded-[30px] bg-[#efe4d8] border-4 border-[#c98c6b]">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none"> {/* Heart Decorations */}
                  <div className="absolute -top-4 left-[20%] text-[#a66a50]">❤️</div>
                  <div className="absolute -top-4 right-[20%] text-[#a66a50]">❤️</div>
                  <div className="absolute -bottom-4 left-[20%] text-[#a66a50]">❤️</div>
                  <div className="absolute -bottom-4 right-[20%] text-[#a66a50]">❤️</div>
                  <div className="absolute top-[20%] -left-4 text-[#a66a50]">❤️</div>
                  <div className="absolute bottom-[20%] -left-4 text-[#a66a50]">❤️</div>
                  <div className="absolute top-[20%] -right-4 text-[#a66a50]">❤️</div>
                  <div className="absolute bottom-[20%] -right-4 text-[#a66a50]">❤️</div>
                  {/* Name Label Between Bottom Hearts */}
                  <div className="absolute -bottom-4 text-center text-[#a66a50] font-serif text-lg font-bold tracking-wide">
                    <span className="bg-[#efe4d8] px-2 rounded-md shadow-sm"> Χρησιμοποιούνται μέσα στα pdf, απλώς είπα να τις μαζέψω και εδώ...
                    </span>
                  </div>
                </div>
                {/* Inner Gilded Frame */}
                <div className="p-4 bg-gradient-to-br from-[#f9efe3] to-[#eadbc6] border-[8px] border-[#d9a679] rounded-[20px] shadow-inner">
                  <div className="flex flex-wrap">
                    {paintings.map((painting, index) => (
                      <div key={index} className="w-1/3 p-1"> {/* Adjusted width and padding */}
                        <img src={painting} alt={`Painting ${index + 1}`} className="rounded-[15px] max-h-[300px] object-contain border-2 border-[#bc8f6a] shadow-md" /> {/* Adjusted max height */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      isZografiesRendered = true;
    }
  

    
    if (chapter.pdf) {
      sections.push(
        <div key={chapter.title} className="bg-[#2c1810] p-10 rounded-lg shadow-lg mb-12">
          <h2 className="text-4xl text-[#f5c6aa] mb-6">{chapter.title}</h2>
          {chapter.extra_path && (
                <button
                  onClick={() => handleViewInBookReader(chapter.extra_path)}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                >
                  View in Book Reader
                </button>
              )}
          {chapter.images && chapter.images.length > 0 && (
            <div className="flex flex-wrap">
              {chapter.images.map((image, index) => (
                <div key={index} className="w-1/4 p-1">
                  <img src={image} alt={`Chapter Image ${index + 1}`} className="w-full h-auto rounded-lg shadow-md max-h-32 object-contain" /> {/* Adjusted max height */}
                </div>
              ))}
            </div>
          )}
          <div className="w-full h-[800px] border-4 border-[#8b4513] rounded-lg overflow-hidden shadow-inner mb-8"> {/* Adjusted height */}
            <iframe src={chapter.pdf} className="w-full h-full" title={chapter.title} />
          </div>
          
        </div>
      );
    }

    // Check if subsections have PDFs
    chapter.subsections?.forEach((sub) => {
      if (sub.pdf) {
        sections.push(
          <div key={sub.title} className="bg-[#3a2a1e] p-8 rounded-lg shadow-lg mb-8 ml-8">
            <h3 className="text-3xl text-[#f5c6aa] mb-4">{chapter.title} : {sub.title}</h3>
            {sub.extra_path && (
                <button
                  onClick={() => handleViewInBookReader(sub.extra_path)}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                >
                  View in Book Reader
                </button>
              )}
            {sub.images && sub.images.length > 0 && (
            <div className="flex flex-wrap">
              {sub.images.map((image, index) => (
                <div key={index} className="w-1/4 p-1">
                  <img src={image} alt={`Chapter Image ${index + 1}`} className="w-full h-auto rounded-lg shadow-md max-h-32 object-contain" /> {/* Adjusted max height */}
                </div>
              ))}
            </div>
          )}
            <div className="w-full h-[800px] border-4 border-[#8b4513] rounded-lg overflow-hidden shadow-inner mb-8"> {/* Adjusted height */}
              <iframe src={sub.pdf} className="w-full h-full" title={sub.title} />
            </div>

          </div>
        );
      }

      // Check if subsubsections have PDFs
      sub.subsubsections?.forEach((subsub) => {
        if (subsub.pdf) {
          sections.push(
            <div key={subsub.title} className="bg-[#4a3b2e] p-6 rounded-lg shadow-lg mb-6 ml-8">
              <h4 className="text-2xl text-[#f5c6aa] mb-2">{chapter.title} : {sub.title} : {subsub.title}</h4>
              {subsub.extra_path && (
                <button
                  onClick={() => handleViewInBookReader(subsub.extra_path)}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                >
                  View in Book Reader
                </button>
              )}
              {subsub.images && subsub.images.length > 0 && (
            <div className="flex flex-wrap">
              {subsub.images.map((image, index) => (
                <div key={index} className="w-1/4 p-1">
                  <img src={image} alt={`Chapter Image ${index + 1}`} className="w-full h-auto rounded-lg shadow-md max-h-32 object-contain" /> {/* Adjusted max height */}
                </div>
              ))}
            </div>
          )}
              <div className="w-full h-[800px] border-4 border-[#8b4513] rounded-lg overflow-hidden shadow-inner mb-8"> {/* Adjusted height */}
                <iframe src={subsub.pdf} className="w-full h-full" title={subsub.title} />
              </div>
            </div>
          );
        }
      });
    });

    return sections;
  };


  

  const scrollToChapter = (index) => {
    document.getElementById(`chapter-${index}`).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#1c0f13] font-serif text-[#f0e4d7] p-10">
      {/* Page Description */}
      <div className="max-w-4xl mx-auto mb-12">
      <h3 className="text-2xl text-[#f5c6aa] mb-2">Σχόλια κατά την παραγωγή, δεν θα φαίνονται στην τελική έκδοση: </h3>
      <h4 className="text-2xl text-[#f5c6aa] mb-2">ΠροΠροΤελευταίο σχόλιο dev: 02.01.25: συμάζεμμα ευρετηρίου, αλλαγή εικόνας στην πραγματική και ενημέρωση ιστοριών </h4>
      <h4 className="text-2xl text-[#f5c6aa] mb-2">ΠροΤελευταίο σχόλιο dev: 02.01.25: περιέργως τα πας καλύτερα, καλύτερα πικρόγλυκα με νοσταλγία παρά πικρά σκέτο. Σκέψου το λίγο. Έχεις φτιάξει τόσα πράγματα</h4>
      <h4 className="text-2xl text-[#f5c6aa] mb-2">Τελευταίο σχόλιο dev: 09.01.25: Η ιστορία μεσαίου μεγέθους δεν είναι σε τελική μορφή και θα χρειαστεί περισσότερη δουλειά... φτιάξε τα περιεχόμενα και την εισαγωγή!!!</h4>
     
        <h1 className="text-5xl text-center text-[#f5c6aa] font-bold mb-8">
          Φώκιες
        </h1>
        <p className="text-lg text-center mb-6">
        Η σελίδα αυτή δημιουργήθηκε για να μην θεωρούν τον κόπο τους μάταιο, οι τρελοί συγγραφείς του βιβλίου που ακολουθεί. Η σελίδα θα παραμείνει ιδιωτική μέχρι τον θάνατο των συγγραφέων, δημοσιεύοντας το έργο τους ως κύκνειο άσμα. Προσωπικά (ως προγραμματιστής αυτής της σελίδας) μεγάλο κρίμα να μην βρουν κατανόηση για τις σκέψεις και τα συναισθήματα τους, έστω μετά τον θάνατο τους, αφού εξ'άλλου δεν υπάρχει όσο βαδίζουν στον καταραμένο αυτό κόσμο. 
        </p>
        <p className="text-lg text-center mb-6">
        Γραμμένο αρχικώς στα Ελληνικά, παρακάτω παρουσιάζεται μόνο σε αυτά. Επιλογές για ανάγνωση σε άλλες γλώσσες βρίσκονται στο τέλος της σελίδας (δυνατότητα λήψης σε άλλη γλώσσα)...
         </p>
        <div className="italic text-center text-[#c4a7b3] mb-6">
          --- Deutsche Übersetzung unten ---
        </div>
        <p className="text-lg text-center mb-6">
        Diese Seite wurde erschaffen, damit die Mühen der verrückten Autoren des folgenden Buches nicht vergeblich erscheinen. Die Seite wird bis zum Tod der Autoren privat bleiben und ihr Werk als Schwanengesang veröffentlichen. Persönlich (als Entwickler dieser Seite) empfinde ich es als großes Bedauern, wenn ihre Gedanken und Gefühle nicht verstanden werden, zumindest nach ihrem Tod, da ihnen dies in dieser verfluchten Welt verwehrt bleibt.
        </p>
        <p className="text-lg text-center mb-6">
        Ursprünglich auf Griechisch geschrieben, wird es im Folgenden nur in dieser Sprache präsentiert. Weitere Optionen zum Lesen in anderen Sprachen kann der Leser am Ende der Seite finden (Herunterladen)...
        </p>

        <div className="italic text-center text-[#c4a7b3] mb-6">
          --- English Translation below ---
        </div>
        <p className="text-lg text-center mb-6">
        This page was created so that the labor of the crazy authors of the following book may not be considered in vain. The page will remain private until the death of the authors, publishing their work as a swan song. Personally (as the developer of this page), I find it to be a great pity if their thoughts and feelings are not understood, at least after their death, since there is nothing for them while they tread this cursed world.
        </p>
        <p className="text-lg text-center mb-6">
        Originally written in Greek, below it's presented only in this language. Further options to read in other languages can be found in the end of the page (download)...

        </p>

       {/* NEW IMAGE SECTION */}
        <div className="flex justify-center items-center mt-12 mb-12">
          {/* Outer Ornate Frame */}
          <div className="relative bg-[#f4e6d6] p-6 rounded-[40px] shadow-lg border-[10px] border-[#a66a50]">
            {/* Decorative Border with Heart Design */}
            <div className="relative p-4 rounded-[30px] bg-[#efe4d8] border-4 border-[#c98c6b]">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Heart Decorations */}
                {/* Top and Bottom (X-Axis) */}
                <div className="absolute -top-4 left-[20%] text-[#a66a50]">
                  ❤️
                </div>
                <div className="absolute -top-4 right-[20%] text-[#a66a50]">
                  ❤️
                </div>
                <div className="absolute -bottom-4 left-[20%] text-[#a66a50]">
                  ❤️
                </div>
                <div className="absolute -bottom-4 right-[20%] text-[#a66a50]">
                  ❤️
                </div>
                {/* Left and Right (Y-Axis) */}
                <div className="absolute top-[20%] -left-4 text-[#a66a50]">
                  ❤️
                </div>
                <div className="absolute bottom-[20%] -left-4 text-[#a66a50]">
                  ❤️
                </div>
                <div className="absolute top-[20%] -right-4 text-[#a66a50]">
                  ❤️
                </div>
                <div className="absolute bottom-[20%] -right-4 text-[#a66a50]">
                  ❤️
                </div>
                {/* Name Label Between Bottom Hearts */}
                <div className="absolute -bottom-4 text-center text-[#a66a50] font-serif text-lg font-bold tracking-wide">
                  <span className="bg-[#efe4d8] px-2 rounded-md shadow-sm">
                    version: 1.1 (it's edited estiamtion of a future drawing)
                  </span>
                </div>
             
              </div>
              {/* Inner Gilded Frame */}
              <div className="p-4 bg-gradient-to-br from-[#f9efe3] to-[#eadbc6] border-[8px] border-[#d9a679] rounded-[20px] shadow-inner">
                <img
                  src="./images/revelation_screen_shot1.png" /* Replace this with your image path old :version1_fwkies */
                  alt="Melancholic Book Atmosphere"
                  className="rounded-[15px] max-h-[500px] object-contain border-2 border-[#bc8f6a] shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      

      
      {/* General Index */}
      <div className="bg-[#2c1810] p-10 rounded-lg shadow-lg mb-12">
        <h2 className="text-4xl text-[#f5c6aa] mb-6">Γενικό Ευρετήριο</h2>
        <h5 className="text-2xl text-[#f5c6aa] mb-2">**μην δίνετε τόσο σημασία ακόμα δεν είναι τελικοποιημένο**</h5>  
        <h4 className="text-2xl text-[#f5c6aa] mb-2">Στο ευρετήριο περιγράφεται η ιδέα του έργου, περιέχει όλους τους τίτλους από όλα τα κείμενα με τα οποία έχω ασχοληθεί ή σκεφτεί.</h4>
        <h4 className="text-2xl text-[#f5c6aa] mb-2">Παρ' όλα αυτά στη σελίδα εμπεριέχονται μόνο αυτά τα οποία έχω όντως κάνει (και δαχτυλογραφήσει).</h4>
        <button onClick={toggleIndex} className="bg-[#8b4513] text-white px-4 py-2 rounded-lg mb-4">
          {isIndexExpanded ? 'Εξαφάνιση Ευρετηρίου' : 'Εμφάνιση Ευρετηρίου'}
        </button>
        {isIndexExpanded && (
          <div className="leading-relaxed border-l-4 border-[#8b4513] pl-6 mb-6 text-[#e4b8a3]">
            {bookData.chapters.map((chapter, index) => (
              <div key={index}>
                <h3 className="text-3xl text-[#f5c6aa] mb-4">{chapter.title}</h3>
                {chapter.subsections?.map((sub, subIndex) => (
                  <div key={subIndex} className="ml-4">
                    <h4 className="text-2xl text-[#f5c6aa] mb-2">{sub.title}</h4>
                    {sub.subsubsections?.map((subsub, subsubIndex) => (
                      <div key={subsubIndex} className="ml-4">
                        <h5 className="text-xl text-[#f5c6aa] mb-2">{subsub.title}</h5>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Render PDF Sections */}
      {bookData.chapters.map((chapter) => renderPDFSections(chapter))}
    </div>
  );
}

export default Fwkia;
