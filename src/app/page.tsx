'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiHeart, FiStar } from 'react-icons/fi';
import Image from 'next/image';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [results, setResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    multiple: false
  });

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Classification error', error);
      setResults([{ class: '分析出错了，请重试', confidence: 1 }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue to-pink p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 hero-text">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            AI Image Classifier
            <span className="text-2xl block mt-2">✨ Powered by Artificial Intelligence ✨</span>
          </h1>
          <p className="text-xl text-white/90 decorative-text">
            Let's discover what's in your image!
          </p>
        </div>

        <div className="glass-panel rounded-xl p-8 backdrop-blur-lg">
          <div {...getRootProps()} className="upload-zone border-2 border-dashed border-white/50 rounded-lg p-8 text-center cursor-pointer hover:border-white">
            <input {...getInputProps()} />
            <FiUpload className="mx-auto text-4xl text-white mb-4" />
            <p className="text-white text-lg">
              {isDragActive ? '放开以上传图片' : '拖放图片到这里或点击上传'}
            </p>
            <p className="text-white/70 text-sm mt-2">支持的格式: JPG, PNG, GIF</p>
          </div>

          {selectedImage && (
            <div className="mt-8 text-center">
              <div className="relative w-64 h-64 mx-auto rounded-lg overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
              <button
                className="gradient-button mt-4 px-8 py-3 rounded-full text-white font-semibold"
                onClick={analyzeImage}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">🔄</span>
                    分析中...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FiStar className="mr-2" />
                    开始分析
                  </span>
                )}
              </button>
            </div>
          )}

          {results && (
            <div className="mt-8 space-y-4">
              <h3 className="text-2xl text-white text-center decorative-text">
                ✨ 分析结果 ✨
              </h3>
              <div className="bg-white/10 rounded-lg p-6">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-white/10 last:border-0"
                  >
                    <span className="text-white">{result.class}</span>
                    <span className="text-white/90">
                      {(result.confidence * 100).toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="text-center text-white/80 space-y-2">
          <p className="decorative-text">体验AI的魔力</p>
          <p className="flex items-center justify-center gap-2">
            Made with <FiHeart className="text-pink-400" /> by AI
          </p>
        </footer>
      </div>
    </main>
  );
}