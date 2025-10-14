"use client";
import { useEffect, useState } from "react";
import { datalearn } from "../data/data";

const Entrypage = () => {
  const allCards = [
    "/assest/kevinimg.jpg",
    "/assest/oxtochiimg.jpg",
    "/assest/nakul.jpg",
    "/assest/rimu.jpg",
    "/assest/shaaran.jpg",
    "/assest/zhouimg.jpg",
    "/assest/internimg.jpg",
    "/assest/bhavesh.jpg",

    "/assest/slapimg.jpg",
    "/assest/gemimg.jpg",
    "/assest/timimage.jpg",
    "/assest/me.jpg",
    "/assest/shyk.jpg",
    "/assest/mufettiimg.jpg",
    "/assest/robimg.jpg",
    "/assest/magus.jpg",

    "/assest/jaysonimg.png",
    "/assest/lukeimg.jpg",
    "/assest/yeet.jpg",
    "/assest/dev.jpg",
    "/assest/mod.jpg",
    "/assest/retro.jpg",
    "/assest/krypt.jpg",
    "/assest/patil.jpg",
  ];

  const CARDS_PER_ROUND = 8;
  const totalRounds = Math.ceil(allCards.length / CARDS_PER_ROUND);

  const generateCards = (round: number) => {
    const start = round * CARDS_PER_ROUND;
    const end = start + CARDS_PER_ROUND;
    const selectedCards = allCards.slice(start, end);
    const deck = [...selectedCards, ...selectedCards];
    return deck.sort(() => Math.random() - 0.5);
  };

  const [round, setRound] = useState(0);
  const [cards, setCards] = useState<string[]>(generateCards(0));
  const [flipCard, setflipCard] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [showDidYouKnow, setShowDidYouKnow] = useState(true);
  const [randomDescription, setRandomDescription] = useState<string | null>(
    null
  );
  const [moregame, setMoregame] = useState(false);
  const [showLearnMoreBox, setShowLearnMoreBox] = useState(false);

  const [timeLeft, setTimeLeft] = useState(50);
  const [timeUp, setTimeUp] = useState(false);


  const tickSound = typeof Audio !== "undefined" ? new Audio("/assest/tick.mp3") : null;

  useEffect(() => {
    if (solved.length === cards.length) return;
    if (timeLeft <= 0) {
      setTimeUp(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, solved, cards.length]);

  useEffect(() => {
    const Mathchedcard = () => {
      const [first, second] = flipCard;
      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipCard]);
      }
      setflipCard([]);
    };

    if (flipCard.length === 2) {
      setTimeout(() => {
        Mathchedcard();
      }, 1000);
    }
  }, [cards, flipCard, solved]);

  const handleLearnMore = () => {
    const randomIndex = Math.floor(Math.random() * datalearn.length);
    setRandomDescription(datalearn[randomIndex].description);
    setShowDidYouKnow(false);
    setShowLearnMoreBox(true);
  };

  const moregames = () => {
    setMoregame(true);
    setShowDidYouKnow(false);
  };


  const Clickedimage = (index: number) => {
    if (flipCard.includes(index) || flipCard.length < 2) {
      if (tickSound) {
        tickSound.currentTime = 0; 
        tickSound.play().catch(() => {}); 
      }
      setflipCard([...flipCard, index]);
    }
  };

  const handleNextRound = () => {
    const nextRound = round + 1;
    if (nextRound < totalRounds) {
      setRound(nextRound);
      setCards(generateCards(nextRound));
      setflipCard([]);
      setSolved([]);
      setShowDidYouKnow(true);
      setTimeLeft(60);
      setTimeUp(false);
    } else {
      setRound(nextRound);
    }
  };

  const gameOver = solved.length === cards.length;
  const allRoundsCompleted = round >= totalRounds;

  return (
    <div className="text-center relative">
      {!timeUp && !gameOver && (
        <div className="fixed top-5 right-5 bg-[#3E3170] text-white px-5 py-2 rounded-xl text-lg font-semibold shadow-md">
          Time Left: {timeLeft}s
        </div>
      )}

      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-transform duration-300 delay-300 ease-in-out">
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
          {moregame ? (
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6 bg-[#3e3170b3] w-auto md:w-[350px] md:h-[340px] rounded-3xl p-6 shadow-lg">
              <h2 className="text-3xl font-bold text-[#FFFFFFB2]">
                More Games
              </h2>
              <div className="flex gap-3 items-center w-full text-left">
                <h3 className="font-semibold text-lg text-white">
                  Multipli Snake Game :
                </h3>
                <a
                  href="https://gamemultipli.vercel.app/"
                  className="text-green-600 underline"
                >
                  Game Link
                </a>
              </div>
              <div className="flex gap-3 items-center w-full text-left">
                <h3 className="font-semibold text-lg text-white">
                  Multipli Quiz :
                </h3>
                <a
                  href="https://multipliquiz.vercel.app/"
                  className="text-green-600 underline"
                >
                  Quiz Link
                </a>
              </div>
              <button
                className="py-3 px-5 bg-gradient-to-r cursor-pointer text-lg font-bold text-white from-[#a66cff] to-[#3E3170] rounded-2xl "
                onClick={() => window.location.reload()}
              >
                Restart Game
              </button>
            </div>
          ) : showLearnMoreBox ? (
            <div className="relative z-10 flex flex-col items-center space-y-9 bg-[#3e3170b3] w-auto md:w-[350px] md:h-[340px] rounded-3xl p-6 shadow-lg">
              <h1 className="text-4xl font-bold text-[#FFFFFFB2]">
                Do You Know? 🤔
              </h1>
              <p className="text-left text-white font-medium ">
                {randomDescription}
              </p>
              <button
                className="py-3 px-5 bg-gradient-to-r cursor-pointer text-lg font-bold text-white from-[#a66cff] to-[#3E3170] rounded-2xl "
                onClick={() => window.location.reload()}
              >
                PLAY AGAIN
              </button>
            </div>
          ) : showDidYouKnow ? (
            <div className="relative z-10 flex flex-col items-center justify-center space-y-9 bg-[#3e3170b3] w-auto md:w-[350px] md:h-[340px] rounded-3xl p-6 shadow-lg">
              <h2 className="text-green-400 font-semibold text-2xl">
                {allRoundsCompleted
                  ? "🎉 Congratulations! You completed all rounds!"
                  : "You won believer"}
              </h2>
              <div className="grid grid-cols-2 items-center gap-3">
                {!allRoundsCompleted ? (
                  <button
                    className="bg-[#a66cff] py-3 px-5 rounded-xl font-semibold cursor-pointer"
                    onClick={handleNextRound}
                  >
                    Next Round
                  </button>
                ) : (
                  <button
                    className="bg-[#a66cff] py-3 px-5 rounded-xl font-semibold cursor-pointer"
                    onClick={() => window.location.reload()}
                  >
                    Restart Game
                  </button>
                )}

                <button
                  className="bg-[#a66cff] py-3 px-5 rounded-xl font-semibold opacity-60 hover:opacity-100 cursor-pointer"
                  onClick={handleLearnMore}
                >
                  Learn More
                </button>
                <button
                  className="bg-[#a66cff] py-3 px-5 rounded-xl font-semibold opacity-60 hover:opacity-100 cursor-pointer"
                  onClick={() => window.location.reload()}
                >
                  Restart Game
                </button>
                <button
                  className="bg-[#a66cff] py-3 px-5 rounded-xl font-semibold opacity-60 hover:opacity-100 cursor-pointer"
                  onClick={moregames}
                >
                  More Games
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {timeUp && !gameOver && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-transform duration-300 delay-300 ease-in-out">
          <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col items-center justify-center space-y-6 bg-[#3e3170b3] w-auto md:w-[350px] md:h-[340px] rounded-3xl p-6 shadow-lg">
            <h2 className="text-3xl font-bold text-red-400">⏰ Time’s Up!</h2>
            <p className="text-white text-lg font-medium">
              Try again. Game Over!
            </p>
            <button
              className="py-3 px-5 bg-gradient-to-r cursor-pointer text-lg font-bold text-white from-[#a66cff] to-[#3E3170] rounded-2xl "
              onClick={() => window.location.reload()}
            >
              Restart Game
            </button>
          </div>
        </div>
      )}

      <h3 className="mb-5 font-bold text-xl md:text-3xl">
        Multipli Memory Game — Round {round + 1}
      </h3>
      <div className="grid grid-cols-4 md:grid-cols-4 gap-3 bg-[#3E3170] p-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-[80px] h-[80px] md:h-28 md:w-28 text-4xl font-bold text-[#3E3170] cursor-pointer transform bg-slate-200 flex justify-center items-center transition-transform duration-300 ${
              flipCard.includes(index) || solved.includes(index)
                ? "rotate-180"
                : ""
            } `}
            onClick={() => Clickedimage(index)}
          >
            {flipCard.includes(index) || solved.includes(index) ? (
              <img src={card} alt="name" className="w-auto h-auto rotate-180" />
            ) : (
              "?"
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entrypage;
