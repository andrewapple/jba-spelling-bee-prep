"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCw, Play, ArrowRight, Trophy, BookOpen } from "lucide-react"

const SPELLING_WORDS = ["tag", "send", "deck", "stuck", "snug", "fish", "hold", "mind", "stay", "scrub", "draw", "brown", "cozy OR cosy", "tint", "milk", "yawn", "tank", "want", "crowd", "pond", "skirt", "sharks", "quilt", "twigs", "taffy", "comfy", "stretch", "tight", "candy", "scrunch", "ruby", "close", "tackle", "wire", "skater", "giant", "bucket", "chance", "baskets", "tender", "paste", "melon", "farmer", "parent", "tail", "hockey", "slime", "insects", "teeth", "shortcut", "bait", "lure", "cluster", "forest", "hollow", "spinning", "baffling", "sizzling", "hoist", "search", "remind", "mango", "coral", "jangle", "shimmer", "blossoms", "swampy", "studded", "focus", "distress", "lessons", "moment", "ajar", "basil", "triple", "satin", "ahoy", "signal", "answer", "shuffle", "dollop", "minnows", "silver", "before", "circus", "writing", "kitchen", "sugar", "awkward", "seep", "sweet", "wheels", "faint", "fruit", "roam", "goats", "woozy", "limbs", "ahead", "señor", "unicorn", "faraway", "heater", "pirates", "understand", "wooden", "leaning", "breakfast", "window", "acrobat", "message", "chocolate", "forepaw", "elephant", "hedgehog", "recipe", "garbage", "surprise", "mermaid", "bombarded", "disability", "incredible", "leather", "countess", "nervous", "peppercorn", "cartwheel", "raise", "weather", "zooming", "attacked", "turnout", "eaten", "streetlights", "journey", "courtyard", "shouting", "asleep", "curious", "dinosaur", "brilliant", "vacuum", "gorgeous", "monsoon", "dangerous", "avocado", "valentine", "February", "formation", "especially", "hesitate", "scorcher", "scavenger", "fragments", "deflated", "unleash", "ration", "cosmetics", "crawdad", "frustration", "unruly", "mascot", "aroma", "moustache OR mustache", "artifacts OR artefacts", "perfume", "sinister", "tuxedo", "discoveries", "lurches", "language", "prognosis", "Buffalo", "sequins", "gallop", "fabulous", "lanky", "fluently", "mysterious", "brandished", "sardines", "anguish", "conical", "rickety", "lilt", "pediatric", "porridge", "democracy", "rummage", "beige", "ancestral", "grimace", "gaunt", "enormous", "geranium", "nautical", "dubious", "ebony", "foreign", "paltry", "verdict", "garbled", "encourages", "imitation", "miniature", "receptionist", "preamble", "plausible", "reprimanding", "commotion", "oblivion", "immigrants", "steeple", "spectators", "lanyards", "suspicious", "parchment", "ramshackle", "fugitive", "heron", "dissolving", "nomad", "billowed", "skewer", "Berlin", "lunacy", "conjure", "bracken", "noggin", "neon", "rakish", "hypnosis", "rotunda", "gusto", "toiletries", "gleaned", "jeered", "winsome", "prattling", "galore", "emporium", "atrium", "eccentric", "savant", "almanac", "hippies", "samosas", "campaign", "pistachio", "mosque", "zombielike", "warlock", "colossus", "convulsively", "dimensional", "garishly", "graffitist", "Everest", "dexterity", "cavorting", "marauder", "conscience", "battlements", "deferential", "albatross", "khaki", "opalescent", "asphalt", "Yiddish", "talcum", "tranquilizer", "equestrian", "plaited", "monsieur", "manticores", "prestigious", "fraidycat", "guttural", "lo mein", "courier", "sans serif", "psyche", "stucco", "Frankenstein", "schema", "et cetera", "vidimus", "delphine", "slough", "archipelago", "serape OR sarape", "puissance", "pinioning", "chignon", "pheromone", "galleon", "magnanimous", "chartreuse", "wainscoting", "Nehru", "gangly", "swaggering", "chimneys", "riveted", "plaid", "dirge", "zeal", "whittled", "depots", "fiberglass", "salvaged", "fissures", "enthusiastic", "discipline", "unfamiliar", "scurrying", "dignitaries", "pizzeria", "dismissal", "skittish", "careened", "nomination", "opportunist", "dictatorship", "comrades", "sporadic", "promenade", "repugnant", "invincible", "renowned", "parachute", "laborious", "appointment", "foreseeable", "ratify", "scalpel", "reclusive", "compassionate", "bulletin", "alfalfa", "officially", "crematorium", "bayonet", "amicable", "exuberant", "beautician", "equations", "assignment", "ultimatum", "whinnying", "squalor", "memoirs", "cylinders", "ominous", "muffler", "syndrome", "premises", "safari", "lasagna", "substantially", "mercantile", "formidable", "propaganda", "marquee", "proficient", "compunction", "emphatically", "hyperventilated", "ostracism", "onslaught", "ruefully", "misanthrope", "prototype", "cravenly", "mulberry", "hypocritical", "chlorine", "traumatic", "receipts", "solemnly", "begrudge", "contentious", "precocious", "ensemble", "cadre", "lye", "belfry", "lacrosse", "sluice", "cajolery", "vigilance", "residuals", "boutique", "peroxide", "aristocracy", "apocalypse", "tuberculosis", "barricade", "confreres", "anonymously", "unparalleled", "barrette", "chassis", "junket", "quandary", "Erie", "gingham", "silhouette", "auxiliary", "thesaurus", "patriarchs", "chandelier", "dulce", "concierge", "latticework", "hibiscus", "tamale", "maracas", "gyroplane", "burpees", "Adriatic", "piccolo", "au revoir", "tulle", "boll weevil", "camphor", "Tucson", "paparazzi", "pumpernickel", "pogrom", "bursitis", "pâtisserie", "cycads", "sarsaparilla", "maître d'", "cannelloni", "boulangerie", "bronchitis", "Oswego", "diphtheria", "baklava", "corbels", "trebuchets", "Kilimanjaro", "fräulein", "protégé", "hors d'oeuvres", "maquisards", "Aubusson", "Charolais OR Charollais"]

export default function SpellingBeePage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [wordQueue, setWordQueue] = useState<string[]>([])
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set())
  const [totalWords] = useState(SPELLING_WORDS.length)
  const [isRandomMode, setIsRandomMode] = useState(false)

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const startGame = () => {
    const initialQueue = isRandomMode ? shuffleArray(SPELLING_WORDS) : [...SPELLING_WORDS]
    setWordQueue(initialQueue)
    setCurrentWordIndex(0)
    setCompletedWords(new Set())
    setGameStarted(true)
  }

  const handleModeToggle = (random: boolean) => {
    setIsRandomMode(random)
    setGameStarted(false)
    setCurrentWordIndex(0)
    setWordQueue([])
    setCompletedWords(new Set())
  }

  const handleNext = () => {
    const currentWord = wordQueue[currentWordIndex]
    const newCompleted = new Set(completedWords)
    newCompleted.add(currentWord)
    setCompletedWords(newCompleted)

    if (currentWordIndex + 1 < wordQueue.length) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      setGameStarted(false)
    }
  }

  const handleRecycle = () => {
    const currentWord = wordQueue[currentWordIndex]
    const newQueue = [...wordQueue]
    newQueue.push(currentWord)
    setWordQueue(newQueue)

    setCurrentWordIndex(currentWordIndex + 1)
  }

  const currentWord = gameStarted && currentWordIndex < wordQueue.length ? wordQueue[currentWordIndex] : null

  const progress = totalWords > 0 ? (completedWords.size / totalWords) * 100 : 0
  const remainingUniqueWords = totalWords - completedWords.size

  return (
    <div className="min-h-screen bg-gradient-to-br from-educational-primary via-educational-secondary to-educational-accent p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-educational-dark" />
            <h1 className="text-4xl md:text-5xl font-bold text-educational-dark text-balance">Juliet Spells</h1>
          </div>
          <p className="text-lg text-educational-muted">{"You got this!"}</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white rounded-full p-1 shadow-lg border-2 border-educational-border">
            <button
              onClick={() => handleModeToggle(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !isRandomMode
                  ? "bg-educational-dark text-white"
                  : "bg-transparent text-educational-dark hover:bg-educational-light"
              }`}
            >
              In Order
            </button>
            <button
              onClick={() => handleModeToggle(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                isRandomMode
                  ? "bg-educational-dark text-white"
                  : "bg-transparent text-educational-dark hover:bg-educational-light"
              }`}
            >
              Random
            </button>
          </div>
        </div>

        <Card className="bg-white shadow-2xl border-4 border-educational-border">
          <div className="p-8 md:p-12">
            {!gameStarted ? (
              <div className="text-center space-y-6">
                {completedWords.size === totalWords && completedWords.size > 0 ? (
                  <>
                    <Trophy className="w-20 h-20 text-educational-success mx-auto" />
                    <h2 className="text-3xl font-bold text-educational-dark">{"Congratulations! 🎉"}</h2>
                    <p className="text-lg text-educational-muted">{"All spelling words have been mastered!"}</p>
                    <p className="text-2xl font-semibold text-educational-dark">{totalWords} words completed</p>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={startGame}
                      size="lg"
                      className="bg-educational-dark hover:bg-educational-dark/90 text-white px-8 py-6 text-xl font-semibold mb-6"
                    >
                      <Play className="w-6 h-6 mr-2" />
                      Start Practice
                    </Button>
                    <h2 className="text-3xl font-bold text-educational-dark">{"Ready to Practice?"}</h2>
                    <p className="text-lg text-educational-muted">
                      {`${totalWords} spelling words are ready for practice`}
                    </p>
                    <p className="text-sm text-educational-muted max-w-md mx-auto leading-relaxed">
                      {
                        "Click Start to begin. Use NEXT for correct answers or RECYCLE for words that need more practice."
                      }
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-educational-dark">Progress</span>
                    <span className="text-educational-muted">
                      {completedWords.size} of {totalWords} mastered
                    </span>
                  </div>
                  <div className="h-3 bg-educational-light rounded-full overflow-hidden">
                    <div
                      className="h-full bg-educational-success transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {remainingUniqueWords > 0 && (
                    <p className="text-sm text-educational-muted text-center">
                      {remainingUniqueWords} {remainingUniqueWords === 1 ? "word" : "words"} remaining
                    </p>
                  )}
                </div>

                <div className="bg-educational-primary/10 rounded-2xl p-12 text-center border-2 border-educational-border">
                  <p className="text-sm font-semibold text-educational-muted uppercase tracking-wide mb-4">
                    Current Word
                  </p>
                  {currentWord && (
                    <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-educational-dark break-words">
                      {currentWord}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleRecycle}
                    size="lg"
                    variant="outline"
                    className="h-16 text-lg font-semibold border-2 border-educational-recycle text-educational-recycle hover:bg-educational-recycle hover:text-white bg-transparent"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Recycle
                  </Button>
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="h-16 text-lg font-semibold bg-educational-success hover:bg-educational-success/90 text-white"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>

                <div className="bg-educational-secondary/30 rounded-lg p-4 border border-educational-border">
                  <p className="text-sm text-educational-dark leading-relaxed">
                    <strong>Instructions:</strong> Read the word aloud. Click <strong>Next</strong> if she spells it
                    correctly, or click <strong>Recycle</strong> to practice it again later.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <p className="text-center text-sm text-educational-dark/70 mt-6">{"Made with ❤️ by Juliet's father"}</p>
      </div>
    </div>
  )
}
