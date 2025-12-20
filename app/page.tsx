"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCw, Play, ArrowRight, Trophy, BookOpen } from "lucide-react"

const SPELLING_WORDS = [
  "tag",
  "send",
  "deck",
  "stuck",
  "snug",
  "fish",
  "hold",
  "mind",
  "stay",
  "scrub",
  "draw",
  "brown",
  "cozy OR cosy",
  "tint",
  "milk",
  "yawn",
  "tank",
  "want",
  "crowd",
  "pond",
  "skirt",
  "sharks",
  "quilt",
  "twigs",
  "taffy",
  "comfy",
  "stretch",
  "tight",
  "candy",
  "scrunch",
  "ruby",
  "close",
  "tackle",
  "wire",
  "shatter",
  "giant",
  "bucket",
  "chance",
  "baskets",
  "tender",
  "surprise",
  "mermaid",
  "bombarded",
  "disability",
  "incredible",
  "leather",
  "countess",
  "nervous",
  "peppercorn",
  "cartwheel",
  "raise",
  "weather",
  "zooming",
  "attached",
  "turnout",
  "eaten",
  "streetlights",
  "journey",
  "courtyard",
  "shouting",
  "search",
  "remind",
  "mango",
  "coral",
  "jangle",
  "shimmer",
  "blossoms",
  "swampy",
  "studded",
  "focus",
  "distress",
  "lessons",
  "moment",
  "ajar",
  "basil",
  "triple",
  "satin",
  "alroy",
  "signal",
  "answer",
  "shuffle",
  "dollop",
  "minnows",
  "silver",
  "before",
  "circus",
  "writing",
  "kitchen",
  "sugar",
  "awkward",
  "seep",
  "sweet",
  "wheels",
  "faint",
  "fruit",
  "roam",
  "gents",
  "woozy",
  "limbs",
  "ahead",
  "señor",
  "unicorn",
  "faraway",
  "heater",
  "pirates",
  "understand",
  "wooden",
  "leaning",
  "breakfast",
  "window",
  "acrobat",
  "message",
  "chocolate",
  "forepaw",
  "elephant",
  "hedgehog",
  "recipe",
  "garbage",
  "asleep",
  "curious",
  "dinosaur",
  "brilliant",
  "vacuum",
  "gorgeous",
  "monsoon",
  "dangerous",
  "avocado",
  "valentine",
  "February",
  "formation",
  "especially",
  "hesitate",
  "scorcher",
  "scavenger",
  "fragments",
  "deflated",
  "unheash",
  "ration",
  "cosmetics",
  "crawdad",
  "frustration",
  "unruly",
  "mascot",
  "aroma",
  "monstache OR mustache",
  "artifacts OR artefacts",
  "perfume",
  "sinister",
  "tuxedo",
  "discoveries",
  "lurches",
  "language",
  "prognosis",
  "Buffalo",
  "sequina",
  "gallop",
  "fabulous",
  "lanky",
  "fluently",
  "mysterious",
  "brandished",
  "sardines",
  "anguish",
  "conical",
  "rickety",
  "lilt",
  "pediatric",
  "porridge",
  "democracy",
  "rummage",
  "beige",
  "ancestral",
  "grimace",
  "gaunt",
  "enormous",
  "geranium",
  "nautical",
  "dubious",
  "ebony",
  "foreign",
  "paltry",
  "verdict",
  "garbled",
  "encourages",
  "imitation",
  "limousine",
  "delicate",
  "wreckage",
  "hazardous",
  "privilege",
  "tranquil",
  "abruptly",
  "enthusiastic",
  "jubilant",
  "substantial",
  "embellished",
  "quarantine",
  "apparatus",
  "boulevard",
  "prestigious",
  "meticulous",
  "catastrophe",
  "archaeology",
  "illuminate",
  "renaissance",
  "pharmaceutical",
]

export default function SpellingBeePage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [wordQueue, setWordQueue] = useState<string[]>([])
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set())
  const [totalWords] = useState(SPELLING_WORDS.length)

  const startGame = () => {
    // Initialize the queue with all words
    setWordQueue([...SPELLING_WORDS])
    setCurrentWordIndex(0)
    setCompletedWords(new Set())
    setGameStarted(true)
  }

  const handleNext = () => {
    // Mark current word as completed
    const currentWord = wordQueue[currentWordIndex]
    const newCompleted = new Set(completedWords)
    newCompleted.add(currentWord)
    setCompletedWords(newCompleted)

    // Move to next word or finish
    if (currentWordIndex + 1 < wordQueue.length) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      // All words completed!
      setGameStarted(false)
    }
  }

  const handleRecycle = () => {
    // Add current word back to the end of the queue
    const currentWord = wordQueue[currentWordIndex]
    const newQueue = [...wordQueue]
    newQueue.push(currentWord)
    setWordQueue(newQueue)

    // Move to next word
    setCurrentWordIndex(currentWordIndex + 1)
  }

  const currentWord = gameStarted && currentWordIndex < wordQueue.length ? wordQueue[currentWordIndex] : null

  const progress = totalWords > 0 ? (completedWords.size / totalWords) * 100 : 0
  const remainingUniqueWords = totalWords - completedWords.size

  return (
    <div className="min-h-screen bg-gradient-to-br from-educational-primary via-educational-secondary to-educational-accent p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-educational-dark" />
            <h1 className="text-4xl md:text-5xl font-bold text-educational-dark text-balance">Spelling Bee Practice</h1>
          </div>
          <p className="text-lg text-educational-muted">{"Help your 5th grader master their spelling words!"}</p>
        </div>

        {/* Main Card */}
        <Card className="bg-white shadow-2xl border-4 border-educational-border">
          <div className="p-8 md:p-12">
            {!gameStarted ? (
              <div className="text-center space-y-6">
                {completedWords.size === totalWords && completedWords.size > 0 ? (
                  // Completion state
                  <>
                    <Trophy className="w-20 h-20 text-educational-success mx-auto" />
                    <h2 className="text-3xl font-bold text-educational-dark">{"Congratulations! 🎉"}</h2>
                    <p className="text-lg text-educational-muted">{"All spelling words have been mastered!"}</p>
                    <p className="text-2xl font-semibold text-educational-dark">{totalWords} words completed</p>
                  </>
                ) : (
                  // Initial state
                  <>
                    <div className="w-20 h-20 rounded-full bg-educational-primary/20 flex items-center justify-center mx-auto">
                      <Play className="w-10 h-10 text-educational-dark" />
                    </div>
                    <h2 className="text-3xl font-bold text-educational-dark">{"Ready to Practice?"}</h2>
                    <p className="text-lg text-educational-muted">
                      {`${totalWords} spelling words are ready for practice`}
                    </p>
                    <p className="text-sm text-educational-muted max-w-md mx-auto leading-relaxed">
                      {
                        "Click Start to begin. Say each word to the student, and use Next for correct answers or Recycle for words that need more practice."
                      }
                    </p>
                  </>
                )}
                <Button
                  onClick={startGame}
                  size="lg"
                  className="bg-educational-dark hover:bg-educational-dark/90 text-white px-8 py-6 text-xl font-semibold"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Start Practice
                </Button>
              </div>
            ) : (
              // Game in progress
              <div className="space-y-8">
                {/* Progress Bar */}
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

                {/* Current Word Display */}
                <div className="bg-educational-primary/10 rounded-2xl p-12 text-center border-2 border-educational-border">
                  <p className="text-sm font-semibold text-educational-muted uppercase tracking-wide mb-4">
                    Current Word
                  </p>
                  {currentWord && <p className="text-5xl md:text-6xl font-bold text-educational-dark">{currentWord}</p>}
                </div>

                {/* Action Buttons */}
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

                {/* Instructions */}
                <div className="bg-educational-secondary/30 rounded-lg p-4 border border-educational-border">
                  <p className="text-sm text-educational-dark leading-relaxed">
                    <strong>Instructions:</strong> Read the word aloud to the student. Click <strong>Next</strong> if
                    they spell it correctly, or click <strong>Recycle</strong> to practice it again later.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-educational-dark/70 mt-6">{"Practice makes perfect! Keep going! 📚"}</p>
      </div>
    </div>
  )
}
