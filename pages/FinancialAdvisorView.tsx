
import React, { useState } from 'react';
import { generateEducationalArticle, getInvestmentAdvice } from '../services/geminiService';
import Spinner from '../components/Spinner';

const FinancialAdvisorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [contentTopic, setContentTopic] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateContent = async () => {
    if (!contentTopic) return;
    setIsLoading(true);
    setGeneratedContent('');
    const content = await generateEducationalArticle(contentTopic);
    setGeneratedContent(content);
    setIsLoading(false);
  };

  const handleGetAdvice = async () => {
    if (!userProfile) return;
    setIsLoading(true);
    setGeneratedContent('');
    const advice = await getInvestmentAdvice(userProfile);
    setGeneratedContent(advice);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Financial Advisor Toolkit</h2>
        <p className="text-gray-600 dark:text-gray-400">Create educational content and assist users in selecting the right mutual funds.</p>
      </div>

      <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-200 dark:border-dark-border">
        <div className="border-b border-gray-200 dark:border-dark-border">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('content')} className={`${activeTab === 'content' ? 'border-primary dark:border-secondary text-primary dark:text-secondary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              Content Creator
            </button>
            <button onClick={() => setActiveTab('advice')} className={`${activeTab === 'advice' ? 'border-primary dark:border-secondary text-primary dark:text-secondary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              AI-Powered Advice
            </button>
          </nav>
        </div>
        
        <div className="mt-6">
          {activeTab === 'content' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Generate Educational Article</h3>
              <input type="text" value={contentTopic} onChange={(e) => setContentTopic(e.target.value)} placeholder="e.g., The basics of asset allocation" className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700 dark:border-dark-border"/>
              <button onClick={handleGenerateContent} disabled={isLoading || !contentTopic} className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-hover disabled:bg-gray-400 transition">
                {isLoading ? 'Generating...' : 'Generate Article'}
              </button>
            </div>
          )}

          {activeTab === 'advice' && (
             <div className="space-y-4">
              <h3 className="text-xl font-semibold">Generate Investment Advice</h3>
              <textarea value={userProfile} onChange={(e) => setUserProfile(e.target.value)} placeholder="Enter investor profile: age, financial goals, risk tolerance, etc.&#10;e.g., A 30-year old looking for long-term growth for retirement with a moderate risk tolerance." className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700 dark:border-dark-border h-24"></textarea>
              <button onClick={handleGetAdvice} disabled={isLoading || !userProfile} className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-hover disabled:bg-gray-400 transition">
                {isLoading ? 'Generating...' : 'Get Advice'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {(isLoading || generatedContent) && (
        <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-200 dark:border-dark-border">
          <h3 className="text-xl font-bold mb-4">Generated Output</h3>
          {isLoading ? (
            <Spinner />
          ) : (
            <article className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialAdvisorView;
