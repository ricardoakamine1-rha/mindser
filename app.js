// MindSer - Main Application

// Admin password (in production, this should be handled server-side)
const ADMIN_PASSWORD = "mindser2024";

// State
let currentSection = 0;
let answers = {};
let reports = JSON.parse(localStorage.getItem('mindser_reports') || '[]');

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// Start Questions
function startQuestions() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const position = document.getElementById('position').value.trim();
    
    if (!name || !email || !position) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Store personal info
    answers.personalInfo = {
        name: name,
        email: email,
        position: position,
        company: document.getElementById('company').value.trim(),
        date: new Date().toLocaleDateString('pt-BR')
    };
    
    // Hide personal info section
    document.getElementById('section-info').style.display = 'none';
    
    // Generate questions
    generateQuestions();
    
    // Show first dimension
    currentSection = 0;
    showDimension(currentSection);
    updateProgress();
}

// Generate Questions HTML - MODIFICADO: Apenas "Dimensão X" sem descrição
function generateQuestions() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    dimensions.forEach((dimension, dimIndex) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'question-section';
        sectionDiv.id = `dimension-${dimIndex}`;
        
        // MODIFICADO: Apenas título simples "Dimensão X"
        let questionsHTML = `
            <div class="dimension-header">
                <h3>Dimensão ${dimension.id}</h3>
            </div>
        `;
        
        dimension.questions.forEach((question, qIndex) => {
            const questionNum = dimIndex * 5 + qIndex + 1;
            const questionId = `q${questionNum}`;
            
            questionsHTML += `
                <div class="question-item">
                    <p class="question-text">
                        <span class="question-number">${questionNum}</span>
                        ${question}
                    </p>
                    <div class="rating-scale">
                        ${[1, 2, 3, 4, 5].map(value => `
                            <div class="rating-option">
                                <input type="radio" name="${questionId}" id="${questionId}_${value}" value="${value}">
                                <label for="${questionId}_${value}">${value}</label>
                            </div>
                        `).join('')}
                    </div>
                    <div class="rating-labels">
                        <span class="label-discordo">Discordo totalmente</span>
                        <span class="label-concordo">Concordo totalmente</span>
                    </div>
                </div>
            `;
        });
        
        questionsHTML += `
            <div class="nav-buttons">
                ${dimIndex > 0 ? '<button type="button" class="btn-nav btn-prev" onclick="prevDimension()">← Anterior</button>' : '<div></div>'}
                ${dimIndex < dimensions.length - 1 
                    ? '<button type="button" class="btn-nav btn-next" onclick="nextDimension()">Próxima →</button>'
                    : '<button type="button" class="btn-nav btn-next" onclick="submitAssessment()">Finalizar e Gerar Relatório</button>'}
            </div>
        `;
        
        sectionDiv.innerHTML = questionsHTML;
        container.appendChild(sectionDiv);
    });
}

// Show Dimension
function showDimension(index) {
    document.querySelectorAll('.question-section').forEach((section, i) => {
        section.classList.toggle('active', i === index);
    });
}

// Navigation
function nextDimension() {
    if (!validateCurrentDimension()) {
        alert('Por favor, responda todas as perguntas desta dimensão.');
        return;
    }
    
    if (currentSection < dimensions.length - 1) {
        currentSection++;
        showDimension(currentSection);
        updateProgress();
        window.scrollTo(0, 0);
    }
}

function prevDimension() {
    if (currentSection > 0) {
        currentSection--;
        showDimension(currentSection);
        updateProgress();
        window.scrollTo(0, 0);
    }
}

// Validate Current Dimension
function validateCurrentDimension() {
    const startQ = currentSection * 5 + 1;
    for (let i = startQ; i < startQ + 5; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selected) return false;
    }
    return true;
}

// Update Progress
function updateProgress() {
    const progress = ((currentSection + 1) / dimensions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${Math.round(progress)}%`;
}

// Submit Assessment
function submitAssessment() {
    if (!validateCurrentDimension()) {
        alert('Por favor, responda todas as perguntas desta dimensão.');
        return;
    }
    
    // Collect all answers
    const responses = [];
    for (let i = 1; i <= 30; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        responses.push(parseInt(selected.value));
    }
    
    // Calculate scores
    const results = calculateScores(responses);
    
    // Generate and download PDF
    generatePDF(results);
    
    // Save report for admin
    saveReport(results);
    
    // Show confirmation
    showPage('confirmation');
}

// Calculate Scores
function calculateScores(responses) {
    const dimensionScores = [];
    let totalScore = 0;
    
    for (let i = 0; i < 6; i++) {
        const start = i * 5;
        const dimensionResponses = responses.slice(start, start + 5);
        const sum = dimensionResponses.reduce((a, b) => a + b, 0);
        const avg = sum / 5;
        dimensionScores.push({
            dimension: dimensions[i],
            responses: dimensionResponses,
            sum: sum,
            average: avg,
            maxScore: 25
        });
        totalScore += sum;
    }
    
    // Determine overall classification
    let classification;
    if (totalScore >= 120) {
        classification = scoreInterpretation.high;
    } else if (totalScore >= 90) {
        classification = scoreInterpretation.medium;
    } else {
        classification = scoreInterpretation.low;
    }
    
    // Get qualitative insights
    const averages = dimensionScores.map(d => d.average);
    const insights = qualitativeAnalysis.filter(a => a.condition(averages));
    
    return {
        personalInfo: answers.personalInfo,
        dimensionScores: dimensionScores,
        totalScore: totalScore,
        maxTotalScore: 150,
        classification: classification,
        insights: insights,
        timestamp: new Date().toISOString()
    };
}

// Generate PDF - MODIFICADO: Mais descritivo e detalhado
function generatePDF(results) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = 20;
    
    // Colors - Atualizados para roxo
    const primaryColor = [75, 0, 130];
    const secondaryColor = [138, 43, 226];
    const accentColor = [186, 85, 211];
    
    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('MindSer', margin, 20);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório de Prontidão Executiva', margin, 32);
    
    doc.setFontSize(10);
    doc.text(`Data: ${results.personalInfo.date}`, pageWidth - margin - 40, 20);
    
    yPos = 60;
    
    // Personal Info
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Dados do Avaliado', margin, yPos);
    
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`Nome: ${results.personalInfo.name}`, margin, yPos);
    yPos += 6;
    doc.text(`Cargo: ${results.personalInfo.position}`, margin, yPos);
    if (results.personalInfo.company) {
        yPos += 6;
        doc.text(`Empresa: ${results.personalInfo.company}`, margin, yPos);
    }
    
    yPos += 15;
    
    // Total Score Box
    const scoreBoxWidth = 80;
    const scoreBoxHeight = 40;
    const scoreBoxX = (pageWidth - scoreBoxWidth) / 2;
    
    doc.setFillColor(...hexToRgb(results.classification.color));
    doc.roundedRect(scoreBoxX, yPos, scoreBoxWidth, scoreBoxHeight, 5, 5, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text(`${results.totalScore}`, pageWidth / 2, yPos + 18, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`de ${results.maxTotalScore} pontos`, pageWidth / 2, yPos + 28, { align: 'center' });
    
    yPos += scoreBoxHeight + 10;
    
    // Classification
    doc.setTextColor(...primaryColor);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(results.classification.label, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const descLines = doc.splitTextToSize(results.classification.description, contentWidth - 20);
    doc.text(descLines, pageWidth / 2, yPos, { align: 'center' });
    
    yPos += descLines.length * 5 + 15;
    
    // Dimension Scores - MODIFICADO: Mais descritivo
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Análise Detalhada por Dimensão', margin, yPos);
    
    yPos += 12;
    
    results.dimensionScores.forEach((dimScore, index) => {
        if (yPos > 220) {
            doc.addPage();
            yPos = 20;
        }
        
        // Dimension title with full name
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryColor);
        doc.text(`Dimensão ${index + 1}: ${dimScore.dimension.title}`, margin, yPos);
        
        yPos += 6;
        
        // Description of what this dimension evaluates
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 100, 100);
        doc.text(dimScore.dimension.description, margin, yPos);
        
        yPos += 8;
        
        // Score bar
        const barY = yPos;
        const barHeight = 10;
        const barMaxWidth = contentWidth - 50;
        const scorePercent = dimScore.sum / dimScore.maxScore;
        const barWidth = barMaxWidth * scorePercent;
        
        // Background bar
        doc.setFillColor(230, 230, 230);
        doc.roundedRect(margin, barY, barMaxWidth, barHeight, 2, 2, 'F');
        
        // Score bar
        const barColor = scorePercent >= 0.8 ? [39, 174, 96] : scorePercent >= 0.6 ? [212, 175, 55] : [231, 76, 60];
        doc.setFillColor(...barColor);
        doc.roundedRect(margin, barY, barWidth, barHeight, 2, 2, 'F');
        
        // Score text
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...barColor);
        doc.text(`${dimScore.sum}/${dimScore.maxScore}`, margin + barMaxWidth + 5, barY + 7);
        
        // Percentage
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`(${Math.round(scorePercent * 100)}%)`, margin + barMaxWidth + 25, barY + 7);
        
        yPos += 15;
        
        // Detailed interpretation
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        
        const interpretation = dimScore.average >= dimScore.dimension.threshold 
            ? dimScore.dimension.interpretation.high 
            : dimScore.dimension.interpretation.low;
        
        // Add detailed analysis based on score
        let detailedAnalysis = "";
        if (scorePercent >= 0.8) {
            detailedAnalysis = dimScore.dimension.detailedHigh || `Excelente desempenho nesta dimensão. ${interpretation}`;
        } else if (scorePercent >= 0.6) {
            detailedAnalysis = dimScore.dimension.detailedMedium || `Desempenho moderado. ${interpretation} Há espaço para desenvolvimento.`;
        } else {
            detailedAnalysis = dimScore.dimension.detailedLow || `Área que requer atenção prioritária. ${interpretation}`;
        }
        
        const interpLines = doc.splitTextToSize(detailedAnalysis, contentWidth);
        doc.text(interpLines, margin, yPos);
        
        yPos += interpLines.length * 4 + 12;
    });
    
    // Qualitative Analysis - MODIFICADO: Mais detalhado
    if (results.insights.length > 0) {
        if (yPos > 200) {
            doc.addPage();
            yPos = 20;
        }
        
        yPos += 5;
        doc.setTextColor(...primaryColor);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Pontos de Atenção e Recomendações', margin, yPos);
        
        yPos += 12;
        
        results.insights.forEach(insight => {
            if (yPos > 240) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFillColor(255, 243, 205);
            doc.roundedRect(margin, yPos - 4, contentWidth, 28, 3, 3, 'F');
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(133, 100, 4);
            doc.text(`${insight.insight}`, margin + 5, yPos + 4);
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            const riskLines = doc.splitTextToSize(insight.risk, contentWidth - 15);
            doc.text(riskLines, margin + 5, yPos + 12);
            
            if (insight.recommendation) {
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(80, 80, 80);
                const recLines = doc.splitTextToSize(`Recomendação: ${insight.recommendation}`, contentWidth - 15);
                doc.text(recLines, margin + 5, yPos + 20);
            }
            
            yPos += 35;
        });
    }
    
    // Summary Section
    if (yPos > 230) {
        doc.addPage();
        yPos = 20;
    }
    
    yPos += 10;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumo Executivo', margin, yPos);
    
    yPos += 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    
    // Generate summary based on results
    let summary = `O(A) avaliado(a) ${results.personalInfo.name} obteve uma pontuação total de ${results.totalScore} pontos de um máximo de 150, `;
    summary += `o que representa ${Math.round((results.totalScore/150)*100)}% de prontidão executiva. `;
    
    if (results.totalScore >= 120) {
        summary += `Este resultado indica que a pessoa demonstra alta prontidão para assumir posições executivas, com bases comportamentais e estratégicas bem estabelecidas. `;
        summary += `Recomenda-se um programa de aceleração executiva focado em exposição e networking estratégico.`;
    } else if (results.totalScore >= 90) {
        summary += `Este resultado indica que a pessoa está em processo de construção das competências executivas. `;
        summary += `Uma mentoria estruturante pode acelerar significativamente o desenvolvimento, focando nas dimensões com menor pontuação.`;
    } else {
        summary += `Este resultado indica que a mentalidade ainda está mais voltada para gestão operacional. `;
        summary += `Recomenda-se uma mentoria de maturação para desenvolver as competências executivas fundamentais antes de buscar posições de diretoria.`;
    }
    
    const summaryLines = doc.splitTextToSize(summary, contentWidth);
    doc.text(summaryLines, margin, yPos);
    
    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 15;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Relatório gerado por MindSer - Diagnóstico de Prontidão Executiva', pageWidth / 2, footerY, { align: 'center' });
    
    // Save PDF
    const fileName = `QDPE_${results.personalInfo.name.replace(/\s+/g, '_')}_${results.personalInfo.date.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
    
    return doc;
}

// Helper function
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0];
}

// Save Report for Admin - MODIFICADO: Salva mais informações
function saveReport(results) {
    const report = {
        id: Date.now(),
        personalInfo: results.personalInfo,
        totalScore: results.totalScore,
        classification: results.classification.label,
        classificationDescription: results.classification.description,
        dimensionScores: results.dimensionScores.map(d => ({
            title: d.dimension.title,
            description: d.dimension.description,
            score: d.sum,
            average: d.average,
            percentage: Math.round((d.sum / d.maxScore) * 100),
            interpretation: d.average >= d.dimension.threshold 
                ? d.dimension.interpretation.high 
                : d.dimension.interpretation.low
        })),
        insights: results.insights,
        timestamp: results.timestamp
    };
    
    reports.unshift(report);
    localStorage.setItem('mindser_reports', JSON.stringify(reports));
}

// Admin Functions
function adminLogin() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        showPage('admin-dashboard');
        renderReports();
    } else {
        alert('Senha incorreta.');
    }
}

function adminLogout() {
    document.getElementById('adminPassword').value = '';
    showPage('landing');
}

// Render Reports - MODIFICADO: Mais informações detalhadas
function renderReports() {
    const container = document.getElementById('reports-list');
    
    if (reports.length === 0) {
        container.innerHTML = '<p class="no-reports">Nenhum relatório disponível ainda.</p>';
        return;
    }
    
    container.innerHTML = reports.map(report => {
        const scoreClass = report.totalScore >= 120 ? 'score-high' : report.totalScore >= 90 ? 'score-medium' : 'score-low';
        const percentage = Math.round((report.totalScore / 150) * 100);
        
        // Generate dimension bars for detailed view
        const dimensionBars = report.dimensionScores ? report.dimensionScores.map((dim, i) => {
            const dimPercent = dim.percentage || Math.round((dim.score / 25) * 100);
            const barClass = dimPercent >= 80 ? 'bar-high' : dimPercent >= 60 ? 'bar-medium' : 'bar-low';
            return `
                <div class="dim-row">
                    <span class="dim-label">D${i+1}: ${dim.title}</span>
                    <div class="dim-bar-container">
                        <div class="dim-bar ${barClass}" style="width: ${dimPercent}%"></div>
                    </div>
                    <span class="dim-score">${dim.score}/25</span>
                </div>
            `;
        }).join('') : '';
        
        // Generate insights summary
        const insightsSummary = report.insights && report.insights.length > 0 
            ? `<div class="insights-summary"><strong>Pontos de atenção:</strong> ${report.insights.map(i => i.insight).join('; ')}</div>`
            : '';
        
        return `
            <div class="report-item-detailed">
                <div class="report-header">
                    <div class="report-info">
                        <h4>${report.personalInfo.name}</h4>
                        <p>${report.personalInfo.position} ${report.personalInfo.company ? '• ' + report.personalInfo.company : ''}</p>
                        <p class="report-date">${report.personalInfo.date}</p>
                    </div>
                    <div class="report-score-section">
                        <div class="report-score">
                            <div class="score ${scoreClass}">${report.totalScore}</div>
                            <div class="label">de 150 (${percentage}%)</div>
                        </div>
                        <div class="classification-badge ${scoreClass}">${report.classification}</div>
                    </div>
                </div>
                <div class="report-details">
                    <div class="dimensions-overview">
                        <h5>Desempenho por Dimensão</h5>
                        ${dimensionBars}
                    </div>
                    ${insightsSummary}
                </div>
                <div class="report-actions">
                    <button class="btn-download" onclick="regeneratePDF(${report.id})">Baixar PDF Completo</button>
                    <button class="btn-details" onclick="toggleDetails(${report.id})">Ver Detalhes</button>
                </div>
            </div>
        `;
    }).join('');
}

function toggleDetails(reportId) {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;
    
    // Create modal with detailed information
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = `modal-${reportId}`;
    
    const dimensionDetails = report.dimensionScores ? report.dimensionScores.map((dim, i) => `
        <div class="detail-dimension">
            <h4>Dimensão ${i+1}: ${dim.title}</h4>
            <p class="dim-description">${dim.description || dimensions[i].description}</p>
            <div class="dim-score-detail">
                <strong>Pontuação:</strong> ${dim.score}/25 (${dim.percentage || Math.round((dim.score/25)*100)}%)
            </div>
            <div class="dim-interpretation">
                <strong>Interpretação:</strong> ${dim.interpretation || (dim.average >= 3 ? dimensions[i].interpretation.high : dimensions[i].interpretation.low)}
            </div>
        </div>
    `).join('') : '';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeModal(${reportId})">×</button>
            <h2>Relatório Detalhado</h2>
            <h3>${report.personalInfo.name}</h3>
            <p>${report.personalInfo.position} ${report.personalInfo.company ? '• ' + report.personalInfo.company : ''}</p>
            <p>Data: ${report.personalInfo.date}</p>
            
            <div class="modal-score">
                <span class="big-score">${report.totalScore}</span>
                <span class="score-label">de 150 pontos</span>
                <span class="classification">${report.classification}</span>
            </div>
            
            <div class="modal-dimensions">
                <h3>Análise por Dimensão</h3>
                ${dimensionDetails}
            </div>
            
            ${report.insights && report.insights.length > 0 ? `
                <div class="modal-insights">
                    <h3>Pontos de Atenção</h3>
                    ${report.insights.map(insight => `
                        <div class="insight-item">
                            <strong>${insight.insight}</strong>
                            <p>${insight.risk}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeModal(reportId) {
    const modal = document.getElementById(`modal-${reportId}`);
    if (modal) modal.remove();
}

function regeneratePDF(reportId) {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;
    
    // Reconstruct results object for PDF generation
    const results = {
        personalInfo: report.personalInfo,
        dimensionScores: report.dimensionScores.map((d, i) => ({
            dimension: dimensions[i],
            sum: d.score,
            average: d.average,
            maxScore: 25
        })),
        totalScore: report.totalScore,
        maxTotalScore: 150,
        classification: report.totalScore >= 120 ? scoreInterpretation.high : 
                       report.totalScore >= 90 ? scoreInterpretation.medium : 
                       scoreInterpretation.low,
        insights: report.insights
    };
    
    generatePDF(results);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load reports from localStorage
    reports = JSON.parse(localStorage.getItem('mindser_reports') || '[]');
});
