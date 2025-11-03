import React, { useState } from 'react';
import { mockFunds } from '../data/mockData';
import Modal from '../components/Modal';

const DashboardCard: React.FC<{ title: string; value: string; icon: string; }> = ({ title, value, icon }) => (
    <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-200 dark:border-dark-border">
        <div className="flex items-center space-x-4">
            <div className="text-3xl">{icon}</div>
            <div>
                <p className="text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    </div>
);

const AdminView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'articles' | 'funds' | null>(null);
    const [selectedFundId, setSelectedFundId] = useState<string>(mockFunds[0].id);

    const openModal = (type: 'articles' | 'funds') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
    };
    
    const selectedFund = mockFunds.find(f => f.id === selectedFundId);

    const mockArticles = [
        { id: 'A01', title: 'Introduction to Mutual Funds', status: 'Published' },
        { id: 'A02', title: 'Understanding Risk vs. Reward', status: 'Draft' },
        { id: 'A03', title: 'The Power of Compounding', status: 'Published' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400">Oversee platform management, user activities, and content updates.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Total Users" value="12,504" icon="👥" />
                <DashboardCard title="Active Sessions" value="1,280" icon="💻" />
                <DashboardCard title="Total Funds" value={mockFunds.length.toString()} icon="📁" />
                <DashboardCard title="Content Updates" value="32" icon="📝" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-200 dark:border-dark-border">
                    <h3 className="text-xl font-bold mb-4">Recent User Activity</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-between"><span>User @john.doe compared 3 funds.</span> <span className="text-sm text-gray-400">2 min ago</span></li>
                        <li className="flex items-center justify-between"><span>User @jane.smith viewed Stable Income Bond Fund.</span> <span className="text-sm text-gray-400">5 min ago</span></li>
                        <li className="flex items-center justify-between"><span>New User signed up.</span> <span className="text-sm text-gray-400">15 min ago</span></li>
                         <li className="flex items-center justify-between"><span>Financial Advisor @adv.pro published "Intro to ETFs".</span> <span className="text-sm text-gray-400">1 hour ago</span></li>
                    </ul>
                </div>
                <div className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-gray-200 dark:border-dark-border">
                    <h3 className="text-xl font-bold mb-4">Content Management</h3>
                    <p className="mb-4">Review and manage educational content and fund data.</p>
                    <div className="flex space-x-4">
                        <button onClick={() => openModal('articles')} className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition">Manage Articles</button>
                        <button onClick={() => openModal('funds')} className="flex-1 bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-hover transition">Update Fund Data</button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === 'articles' ? 'Manage Educational Articles' : 'Update Fund Data'}>
                {modalType === 'articles' && (
                    <div className="space-y-4">
                        {mockArticles.map(article => (
                            <div key={article.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-800 rounded-md">
                                <div>
                                    <p className="font-semibold">{article.title}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${article.status === 'Published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>{article.status}</span>
                                </div>
                                <div className="space-x-2">
                                    <button onClick={() => alert('This is a mock action.')} className="text-sm bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600">Edit</button>
                                    <button onClick={() => alert('This is a mock action.')} className="text-sm bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600">Delete</button>
                                </div>
                            </div>
                        ))}
                         <button onClick={() => alert('This is a mock action.')} className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition">Add New Article</button>
                    </div>
                )}
                {modalType === 'funds' && selectedFund && (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fund-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Fund to Edit</label>
                            <select id="fund-select" value={selectedFundId} onChange={(e) => setSelectedFundId(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-dark-border bg-light-card dark:bg-slate-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                                {mockFunds.map(fund => (
                                    <option key={fund.id} value={fund.id}>{fund.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium">Fund Name</label>
                                <input type="text" defaultValue={selectedFund.name} className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700 dark:border-dark-border" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium">NAV ($)</label>
                                <input type="number" step="0.01" defaultValue={selectedFund.nav} className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700 dark:border-dark-border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">1Y Return (%)</label>
                                <input type="number" step="0.01" defaultValue={selectedFund.oneYearReturn} className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700 dark:border-dark-border" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium">Expense Ratio (%)</label>
                                <input type="number" step="0.01" defaultValue={selectedFund.expenseRatio} className="mt-1 w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700 dark:border-dark-border" />
                            </div>
                        </div>
                         <button onClick={() => { alert('Fund data updated successfully (Demo).'); closeModal(); }} className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition">Save Changes</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default AdminView;