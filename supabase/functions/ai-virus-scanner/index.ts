
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VirusSignature {
  name: string;
  pattern: RegExp;
  type: 'virus' | 'malware' | 'trojan' | 'adware' | 'spyware' | 'ransomware';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

const virusSignatures: VirusSignature[] = [
  {
    name: 'EICAR Test File',
    pattern: /X5O!P%@AP\[4\\PZX54\(P\^\)7CC\)7\}\$EICAR/gi,
    type: 'virus',
    severity: 'critical',
    description: 'EICAR standard antivirus test file detected'
  },
  {
    name: 'Generic Trojan',
    pattern: /(trojan|backdoor|keylogger)/gi,
    type: 'trojan',
    severity: 'high',
    description: 'Generic trojan patterns detected'
  },
  {
    name: 'Cryptocurrency Miner',
    pattern: /(crypto.*miner|bitcoin.*mine|monero.*hash)/gi,
    type: 'malware',
    severity: 'high',
    description: 'Cryptocurrency mining malware detected'
  },
  {
    name: 'Ransomware Patterns',
    pattern: /(encrypt.*files|pay.*bitcoin|ransom.*note)/gi,
    type: 'ransomware',
    severity: 'critical',
    description: 'Ransomware encryption patterns detected'
  },
  {
    name: 'Suspicious Scripts',
    pattern: /(eval\s*\(|document\.write|iframe.*src)/gi,
    type: 'malware',
    severity: 'medium',
    description: 'Suspicious script injection patterns'
  },
  {
    name: 'Adware Signatures',
    pattern: /(popup.*ads|click.*fraud|redirect.*ads)/gi,
    type: 'adware',
    severity: 'low',
    description: 'Adware and potentially unwanted programs'
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { fileName, fileSize, fileType, filePath, content } = await req.json()

    console.log(`AI Scanning: ${fileName} (${fileSize} bytes)`)

    // Advanced AI-powered virus detection simulation
    const scanResult = await performAIVirusScan({
      fileName,
      fileSize,
      fileType,
      filePath,
      content
    })

    return new Response(JSON.stringify(scanResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('AI Virus Scanner error:', error)
    return new Response(JSON.stringify({ 
      error: 'AI scanning failed',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

async function performAIVirusScan(fileData: any) {
  const { fileName, fileSize, fileType, content } = fileData
  
  let status = 'clean'
  let threatDetails = null
  let confidence = 0
  
  // File extension analysis
  const dangerousExtensions = ['.exe', '.scr', '.bat', '.cmd', '.pif', '.com', '.vbs', '.js']
  const executablePattern = new RegExp(`(${dangerousExtensions.join('|').replace(/\./g, '\\.')})$`, 'i')
  
  if (executablePattern.test(fileName)) {
    confidence += 30
    console.log(`Dangerous extension detected: ${fileName}`)
  }

  // File size heuristics
  if (fileSize < 1024) {
    confidence += 10 // Very small files are suspicious
  } else if (fileSize > 100 * 1024 * 1024) {
    confidence += 15 // Very large files are suspicious
  }

  // Content analysis using virus signatures
  if (content) {
    for (const signature of virusSignatures) {
      if (signature.pattern.test(content)) {
        confidence += 50
        status = signature.severity === 'critical' ? 'infected' : 'suspicious'
        
        threatDetails = {
          type: signature.type,
          severity: signature.severity,
          confidence: Math.min(confidence / 100, 1),
          signature: signature.name,
          description: signature.description,
          recommendation: signature.severity === 'critical' 
            ? 'Immediate quarantine required' 
            : 'Monitor and consider quarantine'
        }
        
        console.log(`Threat detected: ${signature.name}`)
        break
      }
    }
  }

  // Advanced heuristic analysis
  if (content && !threatDetails) {
    const suspiciousPatterns = [
      /shell.*execute/gi,
      /registry.*modify/gi,
      /file.*delete/gi,
      /network.*connect/gi,
      /process.*inject/gi
    ]

    let suspiciousCount = 0
    suspiciousPatterns.forEach(pattern => {
      if (pattern.test(content)) {
        suspiciousCount++
      }
    })

    if (suspiciousCount >= 2) {
      confidence += 40
      status = 'suspicious'
      threatDetails = {
        type: 'malware',
        severity: 'medium',
        confidence: Math.min(confidence / 100, 1),
        signature: 'Heuristic Analysis',
        description: `${suspiciousCount} suspicious patterns detected`,
        recommendation: 'Further analysis recommended'
      }
    }
  }

  // Machine Learning simulation (placeholder for real ML model)
  const mlScore = await simulateMLAnalysis(fileData)
  confidence += mlScore

  if (confidence >= 70 && !threatDetails) {
    status = 'suspicious'
    threatDetails = {
      type: 'malware',
      severity: 'medium',
      confidence: Math.min(confidence / 100, 1),
      signature: 'ML Heuristic Detection',
      description: 'Machine learning algorithms detected suspicious patterns',
      recommendation: 'Quarantine recommended for safety'
    }
  }

  return {
    status,
    threatDetails,
    scanTime: Date.now(),
    aiEngineVersion: '2.1.0',
    signatureDatabase: 'Latest',
    confidence: Math.min(confidence / 100, 1)
  }
}

async function simulateMLAnalysis(fileData: any): Promise<number> {
  // Simulate advanced ML processing time
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200))
  
  const { fileName, fileSize, content } = fileData
  let mlScore = 0
  
  // Simulate neural network analysis
  if (content) {
    // Entropy analysis simulation
    const entropy = calculateEntropy(content.substring(0, 1000))
    if (entropy > 7.5) mlScore += 20 // High entropy suggests encryption/packing
    
    // N-gram analysis simulation
    const suspiciousNgrams = ['cmd', 'exe', 'dll', 'reg', 'sys']
    const ngramScore = suspiciousNgrams.reduce((score, ngram) => {
      return score + (content.toLowerCase().includes(ngram) ? 5 : 0)
    }, 0)
    mlScore += ngramScore
  }
  
  // File metadata analysis
  if (fileName.includes('temp') || fileName.includes('tmp')) mlScore += 10
  if (fileSize > 0 && fileSize < 100) mlScore += 15 // Tiny files are suspicious
  
  return Math.min(mlScore, 50) // Cap ML contribution
}

function calculateEntropy(data: string): number {
  const frequency: { [key: string]: number } = {}
  
  for (const char of data) {
    frequency[char] = (frequency[char] || 0) + 1
  }
  
  let entropy = 0
  const length = data.length
  
  for (const count of Object.values(frequency)) {
    const p = count / length
    entropy -= p * Math.log2(p)
  }
  
  return entropy
}
