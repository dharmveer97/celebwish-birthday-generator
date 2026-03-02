'use client';
import { Faker } from '@faker-js/faker';
import { useState, useRef, useCallback } from 'react';
import { celebrities, gradients, categories } from '../data/celebrities';
import {
  Download,
  Search,
  Sparkles,
  Instagram,
  Twitter,
  Facebook,
  AtSign,
  Upload,
  X,
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { domToBlob } from 'modern-screenshot';
import { ThemeToggle } from './theme-toggle';
import { useDropzone } from 'react-dropzone';

type CardSize = 'post' | 'story';
type StoryVariant = 'minimal' | 'elegant' | 'bold';

export default function BirthdayWishGenerator() {
  const [selectedCelebrity, setSelectedCelebrity] = useState(celebrities[0]);
  const [userName, setUserName] = useState('');
  const [customCelebName, setCustomCelebName] = useState('');
  const [customCelebTitle, setCustomCelebTitle] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(0);
  const [selectedGradient, setSelectedGradient] = useState(0);
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cardSize, setCardSize] = useState<CardSize>('story');
  const [storyVariant, setStoryVariant] = useState<StoryVariant>('minimal');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result as string);
        setShowUpload(false);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
  });

  const filteredCelebrities = celebrities.filter((celeb) => {
    const matchesCategory = category === 'All' || celeb.category === category;
    const matchesSearch = celeb.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const downloadImage = async () => {
    if (cardRef.current) {
      try {
        // Force layout recalculation
        cardRef.current.style.overflow = 'visible';
        await new Promise((resolve) => setTimeout(resolve, 100));

        const targetWidth = cardSize === 'story' ? 1080 : 1080;
        const targetHeight = cardSize === 'story' ? 1920 : 1080;

        // Use modern-screenshot with proper options
        const blob = await domToBlob(cardRef.current, {
          width: targetWidth,
          height: targetHeight,
          scale: 3,
          quality: 1,
          backgroundColor: null,
          style: {
            overflow: 'visible',
          },
        });

        // Restore overflow
        cardRef.current.style.overflow = 'hidden';

        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const filename = `celebwish-${userName || 'birthday'}-${cardSize}-${Date.now()}.png`;
          link.download = filename;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        }
      } catch (err) {
        console.error('Failed to download image:', err);
        // Fallback to html-to-image
        try {
          const targetWidth = cardSize === 'story' ? 1080 : 1080;
          const targetHeight = cardSize === 'story' ? 1920 : 1080;

          const dataUrl = await toPng(cardRef.current, {
            quality: 1.0,
            pixelRatio: 3,
            width: targetWidth,
            height: targetHeight,
            cacheBust: true,
            style: {
              overflow: 'visible',
            },
          });
          const link = document.createElement('a');
          link.download = `celebwish-${userName || 'birthday'}-${cardSize}-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        } catch (fallbackErr) {
          console.error('Fallback also failed:', fallbackErr);
        }
      }
    }
  };

  const displayCelebrity = customImage
    ? {
        ...selectedCelebrity,
        image: customImage,
        name: customCelebName || 'Celebrity',
        title: customCelebTitle || '',
      }
    : selectedCelebrity;

  const displayMessage =
    customMessage || selectedCelebrity.messages[selectedMessage];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CelebWish
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
              Free Plan
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search celebrities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Upload Custom Celebrity */}
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-purple-500 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-950/40 transition-all flex items-center justify-center gap-2"
            >
              <Upload className="h-5 w-5" />
              <span className="font-medium">Upload Custom Celebrity Image</span>
            </button>

            {/* Dropzone */}
            {showUpload && (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20'
                    : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-purple-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                {isDragActive ? (
                  <p className="text-purple-600 dark:text-purple-400">
                    Drop the image here...
                  </p>
                ) : (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      Drag & drop an image, or click to select
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      PNG, JPG, JPEG, WEBP
                    </p>
                  </div>
                )}
              </div>
            )}

            {customImage && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <img
                    src={customImage}
                    alt="Custom"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-700 dark:text-green-400">
                      Custom image uploaded!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCustomImage(null);
                      setCustomCelebName('');
                      setCustomCelebTitle('');
                    }}
                    className="text-green-700 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Celebrity Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter celebrity name..."
                      value={customCelebName}
                      onChange={(e) => setCustomCelebName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Celebrity Title (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Singer, Actor..."
                      value={customCelebTitle}
                      onChange={(e) => setCustomCelebTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Custom Message */}
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">
                Custom Message (Optional)
              </label>
              <textarea
                placeholder="Write your own birthday message..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            {/* Celebrity Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
              {filteredCelebrities.map((celeb) => (
                <div
                  key={celeb.id}
                  onClick={() => {
                    setSelectedCelebrity(celeb);
                    setSelectedMessage(0);
                    setCustomImage(null);
                  }}
                  className={`celebrity-card ${
                    selectedCelebrity.id === celeb.id
                      ? 'ring-4 ring-purple-500'
                      : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={celeb.image}
                      alt={celeb.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-900 border-t-2 border-purple-500">
                    <h3 className="font-semibold text-sm truncate text-gray-900 dark:text-gray-100">
                      {celeb.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {celeb.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Your Name */}
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Instagram Handle */}
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">
                Instagram Handle (Optional)
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="dharmveer"
                  value={instagramHandle}
                  onChange={(e) =>
                    setInstagramHandle(e.target.value.replace('@', ''))
                  }
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Card Size Selection */}
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">
                Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCardSize('story')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    cardSize === 'story'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20'
                      : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-20 mx-auto mb-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div>
                    <p className="text-sm font-semibold">Story</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      9:16 (1080x1920)
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setCardSize('post')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    cardSize === 'post'
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20'
                      : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded"></div>
                    <p className="text-sm font-semibold">Post</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      1:1 (1080x1080)
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Message Selection */}
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">
                Choose Message
              </label>
              <div className="space-y-2">
                {selectedCelebrity.messages.map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMessage(idx)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedMessage === idx
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20 text-gray-900 dark:text-gray-100'
                        : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <p className="text-sm">{msg}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Gradient Selection */}
            <div>
              <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">
                Background Style
              </label>
              <div className="grid grid-cols-4 gap-2">
                {gradients.map((gradient, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGradient(idx)}
                    className={`h-12 rounded-lg bg-gradient-to-br ${gradient} ${
                      selectedGradient === idx
                        ? 'ring-2 ring-primary ring-offset-2'
                        : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Story Variant Selection (only for story format) */}
            {cardSize === 'story' && (
              <div>
                <label className="block text-xs font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Story Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setStoryVariant('minimal')}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      storyVariant === 'minimal'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20'
                        : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'
                    }`}
                  >
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      Minimal
                    </p>
                  </button>
                  <button
                    onClick={() => setStoryVariant('elegant')}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      storyVariant === 'elegant'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20'
                        : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'
                    }`}
                  >
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      Elegant
                    </p>
                  </button>
                  <button
                    onClick={() => setStoryVariant('bold')}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      storyVariant === 'bold'
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20'
                        : 'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900'
                    }`}
                  >
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      Bold
                    </p>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-6">
            <div className="sticky top-24">
              {/* Wish Card */}
              <div className="flex justify-center">
                <div
                  ref={cardRef}
                  className={`relative overflow-hidden bg-gradient-to-br ${gradients[selectedGradient]} instagram-story`}
                  style={{
                    width: cardSize === 'story' ? '360px' : '500px',
                    height: cardSize === 'story' ? '640px' : '500px',
                    borderRadius: cardSize === 'story' ? '12px' : '16px',
                  }}
                >
                  {/* Instagram Story Top Bar (only for story format) */}
                  {cardSize === 'story' && (
                    <div className="absolute top-0 left-0 right-0 z-10 p-3">
                      {/* Progress bars */}
                      <div className="flex gap-1 mb-3">
                        <div className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full w-full bg-white rounded-full"></div>
                        </div>
                        <div className="flex-1 h-0.5 bg-white/30 rounded-full"></div>
                        <div className="flex-1 h-0.5 bg-white/30 rounded-full"></div>
                      </div>

                      {/* Profile header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={displayCelebrity.image}
                            alt={displayCelebrity.name}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          />
                          <div className="flex items-center gap-1">
                            <span className="text-white text-sm font-semibold instagram-handle drop-shadow-lg">
                              {displayCelebrity.username ||
                                displayCelebrity.name
                                  .toLowerCase()
                                  .replace(' ', '')}
                            </span>
                            {displayCelebrity.verified && (
                              <svg
                                className="w-3.5 h-3.5 drop-shadow-lg"
                                viewBox="0 0 22 22"
                              >
                                <path
                                  d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                                  fill="white"
                                />
                                <path
                                  d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                                  fill="black"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-white/80 text-xs drop-shadow-lg">
                            2h
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button className="text-white drop-shadow-lg">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 5L6 9H2v6h4l5 4V5z" />
                              <line x1="23" y1="9" x2="17" y2="15" />
                              <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                          </button>
                          <button className="text-white drop-shadow-lg">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <rect x="6" y="4" width="4" height="16" rx="1" />
                              <rect x="14" y="4" width="4" height="16" rx="1" />
                            </svg>
                          </button>
                          <button className="text-white drop-shadow-lg">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <circle cx="12" cy="5" r="2" />
                              <circle cx="12" cy="12" r="2" />
                              <circle cx="12" cy="19" r="2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content Container */}
                  <div
                    className={`absolute inset-0 flex flex-col ${cardSize === 'story' ? 'pt-16 pb-20' : 'p-8'}`}
                  >
                    {/* Post format - show celebrity at top */}
                    {cardSize === 'post' && (
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={displayCelebrity.image}
                          alt={displayCelebrity.name}
                          className="w-14 h-14 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        <div className="text-white text-shadow-strong">
                          <h3 className="text-lg font-bold">
                            {displayCelebrity.name}
                          </h3>
                          {displayCelebrity.title && (
                            <p className="text-xs opacity-90">
                              {displayCelebrity.title}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Birthday Message */}
                    <div className="flex-1 flex items-center justify-center px-6">
                      {storyVariant === 'minimal' && (
                        <div className="text-center text-white space-y-4 w-full">
                          <h2 className="font-bold text-3xl text-shadow-strong">
                            Happy Birthday!
                          </h2>
                          {userName && (
                            <p className="font-bold text-2xl text-shadow-strong">
                              {userName}
                            </p>
                          )}
                          <div className="glass-dark rounded-2xl px-6 py-4 mt-4 backdrop-blur-xl">
                            <p className="text-base font-medium leading-relaxed">
                              {displayMessage}
                            </p>
                          </div>
                        </div>
                      )}

                      {storyVariant === 'elegant' && (
                        <div className="text-center text-white space-y-6 w-full px-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-center gap-3">
                              <div className="w-12 h-px bg-white/60"></div>
                              <div className="w-2 h-2 rounded-full bg-white/80"></div>
                              <div className="w-12 h-px bg-white/60"></div>
                            </div>
                            <h2 className="font-serif text-3xl text-shadow-strong tracking-wide">
                              Happy Birthday
                            </h2>
                            {userName && (
                              <p className="font-serif text-2xl text-shadow-strong italic">
                                {userName}
                              </p>
                            )}
                            <div className="flex items-center justify-center gap-3">
                              <div className="w-12 h-px bg-white/60"></div>
                              <div className="w-2 h-2 rounded-full bg-white/80"></div>
                              <div className="w-12 h-px bg-white/60"></div>
                            </div>
                          </div>
                          <div className="glass-effect rounded-2xl px-6 py-5 backdrop-blur-2xl border border-white/40 shadow-2xl">
                            <p className="text-base font-light leading-relaxed tracking-wide">
                              {displayMessage}
                            </p>
                          </div>
                        </div>
                      )}

                      {storyVariant === 'bold' && (
                        <div className="text-center text-white space-y-5 w-full">
                          <div className="relative">
                            <h2 className="font-black text-4xl text-shadow-strong uppercase">
                              Happy
                            </h2>
                            <h2 className="font-black text-4xl text-shadow-strong uppercase -mt-1">
                              Birthday
                            </h2>
                          </div>
                          {userName && (
                            <div className="glass-dark rounded-full px-6 py-3 inline-block backdrop-blur-xl">
                              <p className="font-bold text-xl">{userName}</p>
                            </div>
                          )}
                          <div className="mt-6">
                            <p className="text-base font-semibold leading-relaxed text-shadow-strong px-4">
                              {displayMessage}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Post format - bottom branding */}
                    {cardSize === 'post' && (
                      <div className="text-center text-white space-y-2 mt-6">
                        {instagramHandle && (
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Instagram className="h-4 w-4" />
                            <p className="text-base font-semibold instagram-handle text-shadow-strong">
                              @{instagramHandle}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Instagram Story Bottom Bar (only for story format) */}
                  {cardSize === 'story' && (
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                      <div className="flex items-center justify-between gap-3">
                        {/* Message input area */}
                        <div className="flex-1 flex items-center gap-2 glass-effect rounded-full px-4 py-2.5 backdrop-blur-xl">
                          {instagramHandle && (
                            <span className="text-white text-sm font-semibold instagram-handle">
                              @{instagramHandle}
                            </span>
                          )}
                          {!instagramHandle && (
                            <span className="text-white/80 text-sm">
                              Send message
                            </span>
                          )}
                        </div>

                        {/* Share button */}
                        <button className="text-white drop-shadow-lg">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={downloadImage}
                className="w-full mt-4 bg-purple-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors cursor-pointer"
              >
                <Download className="h-5 w-5" />
                Download for Instagram {cardSize === 'story' ? 'Story' : 'Post'}
              </button>

              {/* Social Share Info */}
              <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                <p className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                  Perfect for:
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Instagram className="h-4 w-4" />
                    <span>{cardSize === 'story' ? 'Story' : 'Post'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Twitter className="h-4 w-4" />
                    <span>Twitter</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Facebook className="h-4 w-4" />
                    <span>Facebook</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
