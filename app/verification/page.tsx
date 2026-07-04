'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Home, ChevronRight, Check, ShieldAlert, Mail, ClipboardCopy, ArrowRight, RotateCcw, Award } from 'lucide-react';
import SchemaMarkup from '@/components/SchemaMarkup';

function getRandomPuzzle() {
  const n1 = Math.floor(Math.random() * 12) + 3; // 3 to 14
  const n2 = Math.floor(Math.random() * 10) + 1; // 1 to 10
  const ops: ('+' | '-')[] = ['+', '-'];
  const chosenOp = ops[Math.floor(Math.random() * ops.length)];
  
  if (chosenOp === '-' && n1 < n2) {
    return { num1: n2, num2: n1, operation: chosenOp as '+' | '-' };
  }
  return { num1: n1, num2: n2, operation: chosenOp as '+' | '-' };
}

export default function VerificationPage() {
  const [puzzle, setPuzzle] = useState({ num1: 3, num2: 8, operation: '+' as '+' | '-' });
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPuzzle(getRandomPuzzle());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const generatePuzzle = () => {
    setPuzzle(getRandomPuzzle());
    setUserAnswer('');
    setIsCorrect(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(userAnswer, 10);
    const actualResult = puzzle.operation === '+' ? puzzle.num1 + puzzle.num2 : puzzle.num1 - puzzle.num2;

    if (parsed === actualResult) {
      setIsCorrect(true);
      setTimeout(() => {
        setIsVerified(true);
      }, 600);
    } else {
      setIsCorrect(false);
      setAttempts((prev) => prev + 1);
      // Automatically reset error after 1.5 seconds so they can try again
      setTimeout(() => {
        setIsCorrect(null);
        setUserAnswer('');
      }, 1500);
    }
  };

  const getEmailAddress = () => {
    const pre = 'info';
    const domain = 'liquifilm';
    const sfx = 'com';
    return `${pre}@${domain}.${sfx}`;
  };

  const handleCopyToClipboard = () => {
    const email = getEmailAddress();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setIsVerified(false);
    setUserAnswer('');
    setIsCorrect(null);
    setAttempts(0);
    generatePuzzle();
  };

  const siteUrl = "https://liquifilm.com";
  const pageUrl = `${siteUrl}/verification`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Administration Verification",
        "item": pageUrl
      }
    ]
  };

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Navigation Breadcrumbs */}
      <nav className="mx-auto max-w-3xl mb-8 flex items-center gap-2 text-xs font-mono text-neutral-400">
        <Link href="/" className="hover:text-neutral-900 transition-colors flex items-center gap-1">
          <Home className="h-3.5 w-3.5" /> Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-900 font-medium">Administration Verification</span>
      </nav>

      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 md:p-10 shadow-sm">
          {/* Header */}
          <div className="text-center pb-6 border-b border-neutral-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs font-mono font-semibold text-neutral-800 border border-neutral-200">
              <Award className="h-3.5 w-3.5 text-neutral-600" /> Security Portal
            </span>
            <h1 className="mt-4 font-display text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
              Human Verification
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500 max-w-sm mx-auto">
              Solve the simple optical math equations to confirm authorized human intent and unlock administrator contact credentials.
            </p>
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {!isVerified ? (
                <motion.div
                  key="puzzle-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Math Equation Visual */}
                    <div className="bg-neutral-950 text-white rounded-xl p-8 text-center border border-neutral-800 shadow-inner relative overflow-hidden">
                      {/* Sub-grid lines for clean industrial style */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
                      
                      <div className="relative z-10 font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4">
                        Optical Core Math Verification
                      </div>
                      
                      <div className="relative z-10 flex items-center justify-center gap-6 font-display text-5xl font-extrabold tracking-tight select-none">
                        <span className="text-neutral-100">{puzzle.num1}</span>
                        <span className="text-neutral-500">{puzzle.operation}</span>
                        <span className="text-neutral-100">{puzzle.num2}</span>
                        <span className="text-neutral-500">=</span>
                        <span className="text-neutral-400">?</span>
                      </div>
                    </div>

                    {/* Answer Input and Status Info */}
                    <div>
                      <label htmlFor="answer-input" className="block text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider mb-2">
                        Your Solution
                      </label>
                      <div className="relative rounded-lg shadow-xs">
                        <input
                          id="answer-input"
                          type="number"
                          required
                          autoFocus
                          disabled={isCorrect === true}
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          placeholder="Type calculation result"
                          className={`w-full rounded-lg border px-4 py-3 text-base text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:ring-2 transition-all ${
                            isCorrect === true
                              ? 'border-emerald-500 focus:ring-emerald-500/20 bg-emerald-50/20'
                              : isCorrect === false
                              ? 'border-red-500 focus:ring-red-500/20 bg-red-50/20 shake-element'
                              : 'border-neutral-300 focus:border-neutral-950 focus:ring-neutral-950/10'
                          }`}
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          {isCorrect === true && (
                            <Check className="h-5 w-5 text-emerald-600 animate-bounce" />
                          )}
                          {isCorrect === false && (
                            <ShieldAlert className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>
                      
                      {isCorrect === false && (
                        <p className="mt-2 text-xs font-medium text-red-600 font-mono">
                          ✕ Incorrect solution. Regenerating variables...
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={generatePuzzle}
                        disabled={isCorrect === true}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer select-none"
                      >
                        <RotateCcw className="h-4 w-4 text-neutral-400" /> Change Puzzle
                      </button>
                      
                      <button
                        type="submit"
                        disabled={!userAnswer || isCorrect === true}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-neutral-950 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Verify Solution <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="verified-details"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="space-y-6 text-center"
                >
                  {/* Big Circular Checkmark Icon */}
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 mb-2">
                    <Check className="h-8 w-8 stroke-[3px]" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">Identity Successfully Verified</h3>
                    <p className="mt-1.5 text-xs text-neutral-500 max-w-sm mx-auto">
                      Calculation complete. The independent archival administration contact desk is now unlocked for official inquiries.
                    </p>
                  </div>

                  {/* Credentials Card */}
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-6 space-y-4 max-w-sm mx-auto text-left">
                    <div>
                      <span className="block text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                        Official Administration Email
                      </span>
                      <div className="mt-2 flex items-center justify-between gap-3 bg-white border border-neutral-200 rounded-lg px-3 py-2">
                        <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-800 truncate selection:bg-emerald-100">
                          {getEmailAddress()}
                        </span>
                        <button
                          onClick={handleCopyToClipboard}
                          className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
                          title="Copy email address"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <ClipboardCopy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {copied && (
                        <p className="mt-1 text-[10px] text-emerald-600 font-semibold font-mono text-right">
                          ✓ Address copied to clipboard!
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-emerald-100 text-xs text-neutral-500 leading-relaxed">
                      <strong>liquifilm.com</strong> operates as an independent, peer-reviewed knowledge hub. For acquisition proposals or domain operations, explore the official <a href="https://bridge.ws" target="_blank" rel="noopener noreferrer" className="text-neutral-800 underline font-semibold hover:text-neutral-950">bridge.ws</a> portal.
                    </div>
                  </div>

                  {/* Action Buttons to go back or reset */}
                  <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-400 hover:text-neutral-800 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Re-Lock Portal
                    </button>
                    <span className="hidden sm:inline text-neutral-300">|</span>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-950 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-neutral-800 transition-colors"
                    >
                      Return Home <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
