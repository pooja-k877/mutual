
import React, { useState } from 'react';
import { generateMarketReport } from '../services/geminiService';
import Spinner from '../components/Spinner';

const DataAnalystView: React.FC = () => {
    const [reportTopic, setReportTopic] = useState('');
    const [generatedReport, setGeneratedReport] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateReport = async () => {
        if (!reportTopic) return;
        setIsLoading(true);
        setGeneratedReport('');
        const report = await generateMarketReport(reportTopic);
        setGeneratedReport(report);
        setIsLoading(false);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Data Analyst Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400">Analyze investment trends, update fund data, and generate reports.</p>
            </div>

            <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-200 dark:border-dark-border">
                <h3 className="text-xl font-semibold mb-4">Generate Market Trend Report</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={reportTopic}
                        onChange={(e) => setReportTopic(e.target.value)}
                        placeholder="e.g., Impact of AI on technology sector funds"
                        className="flex-grow p-3 border rounded-md bg-gray-50 dark:bg-slate-700 dark:border-dark-border focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={handleGenerateReport}
                        disabled={isLoading || !reportTopic}
                        className="bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-hover disabled:bg-gray-400 transition"
                    >
                        {isLoading ? 'Generating...' : 'Generate Report'}
                    </button>
                </div>
            </div>

            {(isLoading || generatedReport) && (
                <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-200 dark:border-dark-border">
                    <h3 className="text-xl font-bold mb-4">Generated Report</h3>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <article className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: generatedReport.replace(/\n/g, '<br />') }} />
                    )}
                </div>
            )}
        </div>
    );
};

export default DataAnalystView;
