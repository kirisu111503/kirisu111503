import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ScanText, 
  Sparkles, 
  FileCheck, 
  Cpu, 
  Download, 
  Copy, 
  Check, 
  FileText,
  ChevronRight
} from 'lucide-react';

const SAMPLE_DOCUMENTS = [
  {
    id: 'doc-q4-report',
    title: 'Q4 Engineering & Achievement Report.pdf',
    category: 'Achievement Report',
    date: '2026-07-15',
    size: '1.4 MB',
    extractedData: {
      title: 'Q4 2026 Software Engineering & Systems Achievement Report',
      author: 'Developer Systems Team',
      keyEntities: [
        { label: 'Target Period', value: 'Q4 2026', confidence: '99.9%' },
        { label: 'System Availability', value: '99.98%', confidence: '99.5%' },
        { label: 'Processed Documents', value: '14,250 Files', confidence: '98.9%' },
        { label: 'Core Tech Stack', value: 'Python, Tesseract, OpenAI, React', confidence: '99.1%' }
      ],
      rawText: `[Extracted Text - OCR Confidence: 99.4%]
TITLE: Q4 2026 SOFTWARE ENGINEERING ACHIEVEMENT REPORT
DATE: July 15, 2026

EXECUTIVE SUMMARY:
During Q4 2026, the developer spearheaded the rollout of the Automated Document Management System (ADMS). Combining Tesseract-based OCR engine with fine-tuned LLM summarizers, the system successfully ingested over 14,250 physical and PDF document scans.

KEY ACHIEVEMENTS & MILESTONES:
1. Automated Document Processing: Reduced manual document logging time by 84.5% across 4 department workflows.
2. OCR Optical Text Extraction: Attained an average text accuracy confidence score of 99.4% on structured forms and invoices.
3. Intelligent Query Reports: Implemented custom query filters allowing stakeholders to compile instantly filtered quarterly summaries.
4. Error Reduction: Zero missing key entities detected across 2,400 audited compliance forms.`,
      aiSummary: {
        headline: 'Automated Document System achieved 84.5% time savings and processed 14,250+ files in Q4.',
        bulletPoints: [
          'Engineered OCR extraction pipeline handling multi-page PDF & scanned image inputs.',
          'Integrated LLM summarization to synthesize lengthy reports into concise bullet points.',
          'Created automated query builder for quarterly compliance & achievement audit generation.'
        ],
        metrics: { timeSaved: '84.5%', accuracy: '99.4%', volume: '14,250' }
      }
    }
  },
  {
    id: 'doc-invoice',
    title: 'Invoice_Services_2026_042.png',
    category: 'Quarterly Financials',
    date: '2026-07-02',
    size: '840 KB',
    extractedData: {
      title: 'Invoice #INV-2026-042 - Automation Services',
      author: 'Software Solutions',
      keyEntities: [
        { label: 'Invoice No', value: 'INV-2026-042', confidence: '100%' },
        { label: 'Total Amount', value: '$12,450.00 USD', confidence: '99.8%' },
        { label: 'Tax ID', value: 'US-94810294-X', confidence: '99.2%' },
        { label: 'Status', value: 'Paid (Verified)', confidence: '99.6%' }
      ],
      rawText: `[Extracted Text - OCR Confidence: 99.6%]
INVOICE NUMBER: INV-2026-042
DATE: 2026-07-02
BILL TO: Enterprise Client Inc.
SERVICES RENDERED:
- OCR Preprocessing Engine Setup: $4,500.00
- AI Summary & Document Search Integration: $5,450.00
- Dashboard & Quarterly Report Generator: $2,500.00
TOTAL DUE: $12,450.00 USD
STATUS: Paid in full via Electronic Transfer.`,
      aiSummary: {
        headline: 'Verified invoice for $12,450.00 covering complete OCR & AI summary engine deployment.',
        bulletPoints: [
          'All 3 deliverable line items parsed with 99.6% OCR entity accuracy.',
          'Categorized automatically under Systems Automation & Financial Expenses.',
          'Calculated total amount with verified zero discrepancy against bank logs.'
        ],
        metrics: { timeSaved: '92.0%', accuracy: '99.8%', volume: '$12,450' }
      }
    }
  }
];

export default function OcrSystemSimulator() {
  const [selectedDoc, setSelectedDoc] = useState(SAMPLE_DOCUMENTS[0]);
  const [activeTab, setActiveTab] = useState('summary');
  const [copied, setCopied] = useState(false);
  
  // Custom Query Filters
  const [reportType, setReportType] = useState('Quarterly Achievement Report');
  const [timeFilter, setTimeFilter] = useState('Q4 2026');
  const [searchKeyword, setSearchKeyword] = useState('Automation');

  const triggerScan = (doc) => {
    setSelectedDoc(doc);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ocr-system" className="py-20 bg-palette-darkBg border-b border-palette-darkBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palette-darkCard border border-palette-darkBorder text-palette-rose text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Application Demo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Automated <span className="pro-accent-text">AI & OCR Document</span> System
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Select a document preset below to test text extraction, AI summarization, and query-based report compilation.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Preset Switcher (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="pro-card p-4 rounded-2xl border border-palette-darkBorder space-y-3">
              <span className="text-xs font-mono text-palette-mauve uppercase tracking-wider block">
                Select Document Sample
              </span>

              <div className="space-y-2">
                {SAMPLE_DOCUMENTS.map((doc) => {
                  const isSelected = selectedDoc.id === doc.id;
                  return (
                    <button
                      key={doc.id}
                      onClick={() => triggerScan(doc)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-palette-purple/20 border-palette-rose text-white font-semibold shadow-sm' 
                          : 'bg-palette-darkBg/60 border-palette-darkBorder text-slate-300 hover:bg-palette-darkCard hover:border-palette-darkBorder'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className={`w-4 h-4 shrink-0 ${isSelected ? 'text-palette-rose' : 'text-slate-400'}`} />
                        <div className="truncate">
                          <h4 className="text-xs font-bold truncate">{doc.title}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">{doc.category} • {doc.size}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ingestion Stream */}
            <div className="pro-card p-5 rounded-2xl border border-palette-darkBorder space-y-4">
              <div className="flex items-center justify-between border-b border-palette-darkBorder pb-3 font-mono text-xs">
                <span className="text-slate-400">DOCUMENT_STREAM</span>
                <span className="text-palette-peach font-bold">OCR: 99.4% Match</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {selectedDoc.extractedData.keyEntities.map((ent, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-palette-darkBg border border-palette-darkBorder flex justify-between items-center">
                    <span className="text-slate-400">{ent.label}:</span>
                    <span className="text-white font-bold">{ent.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Processing Tabs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Tab Controls */}
            <div className="pro-card p-1.5 rounded-xl border border-palette-darkBorder flex items-center gap-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab('summary')}
                className={`flex-1 py-2.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'summary' 
                    ? 'bg-palette-darkCard text-white border border-palette-purple/40 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-palette-rose" />
                <span>AI Summary</span>
              </button>

              <button
                onClick={() => setActiveTab('ocr')}
                className={`flex-1 py-2.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'ocr' 
                    ? 'bg-palette-darkCard text-white border border-palette-purple/40 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ScanText className="w-3.5 h-3.5 text-palette-purple" />
                <span>OCR Extracted Text</span>
              </button>

              <button
                onClick={() => setActiveTab('report')}
                className={`flex-1 py-2.5 px-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'report' 
                    ? 'bg-palette-darkCard text-white border border-palette-purple/40 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5 text-palette-peach" />
                <span>Smart Report Compiler</span>
              </button>
            </div>

            {/* Tab 1: AI Summary */}
            {activeTab === 'summary' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pro-card p-6 rounded-2xl border border-palette-darkBorder space-y-5"
              >
                <div className="flex items-center justify-between border-b border-palette-darkBorder pb-3">
                  <h3 className="text-white font-bold text-sm">AI Synthesized Insight</h3>
                  <button 
                    onClick={() => handleCopy(selectedDoc.extractedData.aiSummary.headline)}
                    className="px-2.5 py-1 rounded bg-palette-darkBg border border-palette-darkBorder hover:bg-palette-darkCard text-slate-300 text-xs font-mono flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-palette-rose" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-palette-darkBg border border-palette-darkBorder text-xs leading-relaxed text-slate-200">
                  💡 <strong>Headline Summary:</strong> {selectedDoc.extractedData.aiSummary.headline}
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block">Parsed Bullet Points</span>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedDoc.extractedData.aiSummary.bulletPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-palette-rose mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Tab 2: OCR Extracted Text */}
            {activeTab === 'ocr' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pro-card p-6 rounded-2xl border border-palette-darkBorder space-y-4"
              >
                <h3 className="text-white font-bold text-sm border-b border-palette-darkBorder pb-3">Raw Extracted Text Stream</h3>
                <pre className="p-4 rounded-xl bg-palette-darkBg border border-palette-darkBorder text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
                  {selectedDoc.extractedData.rawText}
                </pre>
              </motion.div>
            )}

            {/* Tab 3: Smart Report Compiler */}
            {activeTab === 'report' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pro-card p-6 rounded-2xl border border-palette-darkBorder space-y-5"
              >
                <h3 className="text-white font-bold text-sm border-b border-palette-darkBorder pb-3">Query-Based User Report Builder</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-palette-darkBg border border-palette-darkBorder">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Report Category</label>
                    <select 
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full bg-palette-darkCard border border-palette-darkBorder rounded-lg text-xs text-white p-2 outline-none"
                    >
                      <option value="Quarterly Achievement Report">Quarterly Achievement Report</option>
                      <option value="Financial Audit Summary">Financial Audit Summary</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Target Period</label>
                    <select 
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="w-full bg-palette-darkCard border border-palette-darkBorder rounded-lg text-xs text-white p-2 outline-none"
                    >
                      <option value="Q4 2026">Q4 2026</option>
                      <option value="Q3 2026">Q3 2026</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Filter Keyword</label>
                    <input 
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="w-full bg-palette-darkCard border border-palette-darkBorder rounded-lg text-xs text-white p-2 outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-palette-darkBg border border-palette-darkBorder space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center text-palette-rose font-bold border-b border-palette-darkBorder pb-2">
                    <span>{reportType} ({timeFilter})</span>
                    <span className="text-[10px] text-slate-400">Match: "{searchKeyword}"</span>
                  </div>

                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    Compiled from ingested files (<span className="text-white font-mono">{selectedDoc.title}</span>). All document parameters validated with 99.4% OCR precision score.
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button 
                      onClick={() => alert(`Report compiled and downloaded successfully!`)}
                      className="palette-btn px-4 py-2 rounded-lg text-xs flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
