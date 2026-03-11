"use client";
import React from "react";

function rallies() {
  const DUMMY_TRACKS = {
    tracks: [
      {
        id: 1,
        name: "Penteli Track 1",
        location: "Attica, Penteli Mountain",
        description:
          "A challenging mountain course featuring steep climbs and hairpin turns through the historic Penteli mountain. This track offers spectacular views of Athens while testing your technical driving skills.",
        rating: 4.5,
        mapImage: '',//"/track1-corner1.jpg",
        photos: [
          {
            url: "/track1-corner1.jpg",
            description: "The famous first hairpin turn",
          },
          {
            url: "/track1-straight.jpg",
            description: "The main straight with Athens view",
          },
        ],
        guides: [
          { vehicleType: "Rally Car", url: "/guides/penteli1-rally.pdf" },
          { vehicleType: "SUV", url: "/guides/penteli1-suv.pdf" },
        ],
        stats: [
          {
            driverName: "Andreas Papadopoulos",
            completionTime: "3:45",
            vehicleType: "Rally Car",
          },
          {
            driverName: "Maria Nikolaou",
            completionTime: "4:12",
            vehicleType: "SUV",
          },
        ],
        comments: [
          {
            userName: "RallyFan1",
            comment:
              "Amazing track with great views of Athens! That first hairpin is tricky.",
          },
          {
            userName: "SpeedDemon",
            comment:
              "Technical but rewarding. Watch out for loose gravel after rain.",
          },
        ],
      },
      {
        id: 2,
        name: "Penteli Track 2",
        location: "Attica, Penteli Mountain",
        description:
          "A technical course winding through the marble quarries of Penteli. Features a mix of gravel and tarmac sections with moderate elevation changes and challenging switchbacks.",
        rating: 4.2,
        mapImage: '',//"/track2-quarry.jpg",
        photos: [
          {
            url: "/track2-quarry.jpg",
            description: "The marble quarry section",
          },
          { url: "/track2-descent.jpg", description: "The technical descent" },
        ],
        guides: [
          { vehicleType: "Rally Car", url: "/guides/penteli2-rally.pdf" },
          { vehicleType: "SUV", url: "/guides/penteli2-suv.pdf" },
        ],
        stats: [
          {
            driverName: "Kostas Dimitriou",
            completionTime: "4:30",
            vehicleType: "Rally Car",
          },
        ],
        comments: [
          {
            userName: "MountainDriver",
            comment:
              "The marble quarry section is unique, never seen anything like it!",
          },
        ],
      },
      {
        id: 3,
        name: "Penteli Track 3",
        location: "Attica, Penteli Mountain",
        description:
          "The most challenging of the Penteli tracks, featuring narrow passages through pine forests and sudden elevation changes. Requires excellent navigation skills and precise driving.",
        rating: 4.8,
        mapImage: '',//"/track3-forest.jpg",
        photos: [
          { url: "/track3-forest.jpg", description: "The pine forest section" },
          { url: "/track3-climb.jpg", description: "The steep final climb" },
        ],
        guides: [
          { vehicleType: "Rally Car", url: "/guides/penteli3-rally.pdf" },
        ],
        stats: [
          {
            driverName: "Yannis Stavrou",
            completionTime: "5:15",
            vehicleType: "Rally Car",
          },
        ],
        comments: [
          {
            userName: "RallyPro",
            comment:
              "Most challenging track in Penteli. The forest section requires full concentration.",
          },
        ],
      },
      {
        id: 4,
        name: "Parnassos Alpine Route",
        location: "Central Greece, Parnassos",
        description:
          "A high-altitude track near the ski resort, featuring snow-lined roads in winter and challenging gravel sections. Tests both driver and vehicle capabilities at elevation.",
        rating: 4.7,
        mapImage: '',//"/parnassos1-snow.jpg",
        photos: [
          {
            url: "/parnassos1-snow.jpg",
            description: "Winter conditions at the ski resort section",
          },
        ],
        guides: [
          { vehicleType: "Rally Car", url: "/guides/parnassos1-rally.pdf" },
        ],
        stats: [
          {
            driverName: "Elena Papandreou",
            completionTime: "6:20",
            vehicleType: "Rally Car",
          },
        ],
        comments: [
          {
            userName: "SnowRacer",
            comment:
              "Incredible winter track. Different experience each season.",
          },
        ],
      },
      {
        id: 5,
        name: "Parnassos Forest Circuit",
        location: "Central Greece, Parnassos",
        description:
          "A beautiful but demanding forest route through dense vegetation. Multiple surface changes and natural obstacles make this a true rally experience.",
        rating: 4.3,
        mapImage: '',//"/parnassos2-forest.jpg",
        photos: [
          {
            url: "/parnassos2-forest.jpg",
            description: "Dense forest technical section",
          },
        ],
        guides: [
          { vehicleType: "Rally Car", url: "/guides/parnassos2-rally.pdf" },
        ],
        stats: [
          {
            driverName: "George Alexandris",
            completionTime: "4:45",
            vehicleType: "Rally Car",
          },
        ],
        comments: [
          {
            userName: "ForestKing",
            comment:
              "Beautiful scenery but dont get distracted. Technical sections require focus.",
          },
        ],
      },
      {
        id: 6,
        name: "Parnassos Summit Challenge",
        location: "Central Greece, Parnassos",
        description:
          "The ultimate high-mountain challenge reaching near the summit of Parnassos. Extreme elevation changes and weather-dependent conditions make this track especially challenging.",
        rating: 4.9,
        mapImage: '',//"/parnassos3-summit.jpg",
        photos: [
          {
            url: "/parnassos3-summit.jpg",
            description: "The challenging summit approach",
          },
        ],
        guides: [
          { vehicleType: "Rally Car", url: "/guides/parnassos3-rally.pdf" },
        ],
        stats: [
          {
            driverName: "Dimitris Economou",
            completionTime: "7:30",
            vehicleType: "Rally Car",
          },
        ],
        comments: [
          {
            userName: "AltitudeChamp",
            comment:
              "The summit approach is not for beginners. Weather can change quickly.",
          },
        ],
      },
    ],
  };

  const [tracks, setTracks] = React.useState([]);
  const [sortBy, setSortBy] = React.useState("name");
  const [selectedTrack, setSelectedTrack] = React.useState(null);
  const [trackDetails, setTrackDetails] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showTrackDropdown, setShowTrackDropdown] = React.useState(false);
  const [showLogTimeModal, setShowLogTimeModal] = React.useState(false);
  const [newTime, setNewTime] = React.useState({
    driverName: "",
    vehicleType: "",
    completionTime: "",
  });

  const fetchTracks = async () => {
    try {
      const data = DUMMY_TRACKS;
      let sortedTracks = [...data.tracks];

      if (sortBy === "location") {
        sortedTracks.sort((a, b) => a.location.localeCompare(b.location));
      } else if (sortBy === "rating") {
        sortedTracks.sort((a, b) => b.rating - a.rating);
      } else {
        sortedTracks.sort((a, b) => a.name.localeCompare(b.name));
      }

      setTracks(sortedTracks);
    } catch (err) {
      setError("Failed to load tracks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrackDetails = async (trackId) => {
    try {
      const track = DUMMY_TRACKS.tracks.find((t) => t.id === trackId);
      if (track) {
        setTrackDetails((prev) => ({ ...prev, [trackId]: track }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogTime = async (trackId) => {
    try {
      const response = await fetch("/api/add-track-time", {
        method: "POST",
        body: JSON.stringify({
          trackId,
          ...newTime,
          completionTime: parseFloat(newTime.completionTime),
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      fetchTrackDetails(trackId);
      setShowLogTimeModal(false);
      setNewTime({ driverName: "", vehicleType: "", completionTime: "" });
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchTracks();
  }, [sortBy]);

  const scrollToTrack = (trackId) => {
    const element = document.getElementById(`track-${trackId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setShowTrackDropdown(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <nav className="fixed w-full bg-[#1c2c1c] shadow-lg z-50 px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-200">
            Racingkrankenwagen Rally Competition
          </h1>
          <div className="flex space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowTrackDropdown(!showTrackDropdown)}
                className="bg-[#2d3d2d] text-gray-200 px-4 py-2 rounded hover:bg-[#3d4d3d]"
              >
                See Tracks <i className="fas fa-chevron-down ml-2"></i>
              </button>
              {showTrackDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#2d3d2d] rounded-md shadow-xl">
                  {tracks.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => scrollToTrack(track.id)}
                      className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-[#3d4d3d]"
                    >
                      {track.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowLogTimeModal(true)}
              className="bg-[#4d5d4d] text-gray-200 px-4 py-2 rounded hover:bg-[#5d6d5d]"
            >
              Log Time
            </button>
          </div>
        </div>
      </nav>
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-[url('')] bg-cover bg-center"> {/* /rally-background.jpg*/}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container mx-auto pt-32 px-4">
          <div className="text-center text-gray-200 max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Welcome to Our Rally Tracks
            </h2>
            <p className="text-xl">
              Experience the thrill of Greek mountain racing on our carefully
              designed rally tracks. From the peaks of Penteli to the slopes of
              Parnassos, each track offers a unique challenge.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 flex justify-end space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#2d3d2d] text-gray-200 px-4 py-2 rounded"
          >
            <option value="name">Sort by Name</option>
            <option value="location">Sort by Location</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center text-gray-200">Loading tracks...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {tracks.map((track) => (
              <div
                key={track.id}
                id={`track-${track.id}`}
                className="bg-[#2d3d2d] rounded-lg shadow-xl p-6"
              >
                <h3 className="text-2xl font-bold text-gray-200 mb-4">
                  {track.name} - {track.location}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={track.mapImage}
                      alt={`Rally track map for ${track.name}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-gray-200">
                    <h4 className="text-xl font-bold mb-2">
                      Track Information
                    </h4>
                    <p>{track.description}</p>
                    <div className="mt-4">
                      <button
                        onClick={() => fetchTrackDetails(track.id)}
                        className="bg-[#4d5d4d] px-4 py-2 rounded hover:bg-[#5d6d5d]"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showLogTimeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2d3d2d] p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-200 mb-4">
              Log New Time
            </h3>
            <input
              type="text"
              name="driverName"
              placeholder="Driver Name"
              className="w-full mb-4 p-2 bg-[#1a1a1a] text-gray-200 rounded"
              value={newTime.driverName}
              onChange={(e) =>
                setNewTime({ ...newTime, driverName: e.target.value })
              }
            />
            <input
              type="text"
              name="vehicleType"
              placeholder="Vehicle Type"
              className="w-full mb-4 p-2 bg-[#1a1a1a] text-gray-200 rounded"
              value={newTime.vehicleType}
              onChange={(e) =>
                setNewTime({ ...newTime, vehicleType: e.target.value })
              }
            />
            <input
              type="number"
              name="completionTime"
              placeholder="Completion Time (seconds)"
              className="w-full mb-4 p-2 bg-[#1a1a1a] text-gray-200 rounded"
              value={newTime.completionTime}
              onChange={(e) =>
                setNewTime({ ...newTime, completionTime: e.target.value })
              }
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogTimeModal(false)}
                className="bg-gray-600 text-gray-200 px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleLogTime(selectedTrack)}
                className="bg-[#4d5d4d] text-gray-200 px-4 py-2 rounded hover:bg-[#5d6d5d]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default rallies;