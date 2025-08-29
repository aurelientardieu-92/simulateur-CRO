'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const ScoreButton = ({ value, currentScore, onUpdate, explanation }: { value: number; currentScore: number; onUpdate: (val: number) => void; explanation: string }) => (
  <div className="flex flex-col items-center" style={{ minHeight: '80px' }}>
    <div className="flex-shrink-0">
      <Button
        variant={currentScore === value ? "default" : "outline"}
        size="sm"
        onClick={() => onUpdate(value)}
        className={`min-w-[3rem] ${currentScore === value ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-300 text-blue-600 hover:bg-blue-50'}`}
      >
        {value}
      </Button>
    </div>
    <div className="flex-grow flex items-center justify-center mt-2">
      <span className="text-xs text-blue-600 text-center max-w-[100px] leading-relaxed px-1">
        {explanation}
      </span>
    </div>
  </div>
)

interface ScoreData {
  teamSize: number
  marketComplexity: number
  revenueStage: number
  growthVelocity: number
  dataReliability: number
  processDefinition: number
  forecastAccuracy: number
  interTeamFriction: number
  sharedKPIs: number
  executiveCommitment: number
}

export default function Scorecard() {
  const [scores, setScores] = useState<ScoreData>({
    teamSize: 0,
    marketComplexity: 0,
    revenueStage: 0,
    growthVelocity: 0,
    dataReliability: 0,
    processDefinition: 0,
    forecastAccuracy: 0,
    interTeamFriction: 0,
    sharedKPIs: 0,
    executiveCommitment: 0
  })

  const updateScore = (key: keyof ScoreData, value: number) => {
    setScores(prev => ({ ...prev, [key]: value }))
  }

  const calculateSection1 = () => {
    return scores.teamSize + scores.marketComplexity + scores.revenueStage + scores.growthVelocity
  }

  const calculateSection2 = () => {
    return scores.dataReliability + scores.processDefinition + scores.forecastAccuracy
  }

  const calculateSection3 = () => {
    return scores.interTeamFriction + scores.sharedKPIs + scores.executiveCommitment
  }

  const calculateTotal = () => {
    return calculateSection1() + calculateSection2() + calculateSection3()
  }

  const getInterpretation = () => {
    const total = calculateTotal()
    if (total > 35) {
      return {
        level: "Besoin fort et immédiat",
        color: "bg-green-500",
        action: "Lancez le processus de recrutement en commençant par un alignement fort du comité de direction.",
        points: [
          "Complexité et maturité élevées",
          "Silos freinent la croissance",
          "Terrain fertile pour CRO transformationnel"
        ]
      }
    } else if (total >= 20) {
      return {
        level: "Besoin émergent",
        color: "bg-yellow-500",
        action: "Il est temps de planifier. Définissez le mandat futur du CRO, renforcez vos processus et vos data et mettez le recrutement d'un CRO sur votre feuille de route à un horizon 6-12 mois.",
        points: [
          "Douleurs de croissance ressenties",
          "Processus commencent à fissurer",
          "Collaboration inter-équipes difficile"
        ]
      }
    } else {
      return {
        level: "Recrutement non adapté",
        color: "bg-red-500",
        action: "Concentrez-vous sur la qualité de l'exécution de chaque équipe et le recrutement de leaders fonctionnels forts (ex: un excellent VP des Ventes) pour construire des processus robustes et répétables au sein de chaque département.",
        points: [
          "Organisation pas assez complexe",
          "Défis liés à l'exécution fonctionnelle",
          "Problèmes d'alignement non critiques"
        ]
      }
    }
  }

  const interpretation = getInterpretation()
  const totalScore = calculateTotal()
  const maxScore = 50
  const progressPercentage = (totalScore / maxScore) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Scorecard CRO - Évaluation Organisationnelle
          </h1>
          <p className="text-blue-700 text-lg">
            Outil d'évaluation pour déterminer le besoin d'un Chief Revenue Officer
          </p>
          <div className="text-sm text-blue-600 mt-2">
            CUGNAI - Aurélien Tardieu - 09/2025
          </div>
        </div>

        {/* Instructions */}
        <Card className="mb-8 border-blue-200 bg-white">
          <CardHeader className="bg-blue-50 border-b border-blue-200">
            <CardTitle className="text-blue-900">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-blue-800">
              Évaluez votre organisation sur les 3 dimensions proposées. Pour chaque critère notez de 1 (faible) à 5 (fort). L'outil calculera automatiquement votre score et vous fournira une recommandation concrète.
            </p>
          </CardContent>
        </Card>

        {/* Section 1: Croissance & Complexité */}
        <Card className="mb-8 border-blue-200 bg-white">
          <CardHeader className="bg-blue-600 text-white border-b border-blue-200">
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              Section 1 : Croissance & Complexité
            </CardTitle>
            <CardDescription className="text-blue-100">
              Évaluez la croissance et la complexité de votre organisation
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Tableau pour l'alignement horizontal */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-blue-200">
                      <th className="text-left pb-3 text-blue-900 font-semibold">Critère</th>
                      <th className="text-center pb-3 w-32">1 (Faible)</th>
                      <th className="text-center pb-3 w-32">3 (Moyen)</th>
                      <th className="text-center pb-3 w-32">5 (Élevé)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Team Size */}
                    <tr className="border-b border-blue-100">
                      <td className="py-4 pr-4 align-top">
                        <div>
                          <h3 className="font-semibold text-blue-900">Taille de l'équipe GTM</h3>
                          <p className="text-sm text-blue-700">(Sales, Mktg, CS)</p>
                        </div>
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={1} currentScore={scores.teamSize} onUpdate={(val) => updateScore('teamSize', val)} explanation="< 15 personnes" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={3} currentScore={scores.teamSize} onUpdate={(val) => updateScore('teamSize', val)} explanation="15 - 50 personnes" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={5} currentScore={scores.teamSize} onUpdate={(val) => updateScore('teamSize', val)} explanation="> 50 personnes" />
                      </td>
                    </tr>

                    {/* Market Complexity */}
                    <tr className="border-b border-blue-100">
                      <td className="py-4 pr-4 align-top">
                        <div>
                          <h3 className="font-semibold text-blue-900">Complexité du marché visé</h3>
                        </div>
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={1} currentScore={scores.marketComplexity} onUpdate={(val) => updateScore('marketComplexity', val)} explanation="1 produit, 1 segment, 1 pays" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={3} currentScore={scores.marketComplexity} onUpdate={(val) => updateScore('marketComplexity', val)} explanation="2 - 3 produits / segments / pays" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={5} currentScore={scores.marketComplexity} onUpdate={(val) => updateScore('marketComplexity', val)} explanation="> 3 produits / segments / pays" />
                      </td>
                    </tr>

                    {/* Revenue Stage */}
                    <tr className="border-b border-blue-100">
                      <td className="py-4 pr-4 align-top">
                        <div>
                          <h3 className="font-semibold text-blue-900">Stade de revenus (ARR)</h3>
                        </div>
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={1} currentScore={scores.revenueStage} onUpdate={(val) => updateScore('revenueStage', val)} explanation="< 5 M€" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={3} currentScore={scores.revenueStage} onUpdate={(val) => updateScore('revenueStage', val)} explanation="5 M€ - 20 M€" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={5} currentScore={scores.revenueStage} onUpdate={(val) => updateScore('revenueStage', val)} explanation="> 20 M€" />
                      </td>
                    </tr>

                    {/* Growth Velocity */}
                    <tr>
                      <td className="py-4 pr-4 align-top">
                        <div>
                          <h3 className="font-semibold text-blue-900">Vélocité de croissance</h3>
                        </div>
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={1} currentScore={scores.growthVelocity} onUpdate={(val) => updateScore('growthVelocity', val)} explanation="Faible ou imprévisible" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={3} currentScore={scores.growthVelocity} onUpdate={(val) => updateScore('growthVelocity', val)} explanation="Croissance stable mais difficile à accélérer" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={5} currentScore={scores.growthVelocity} onUpdate={(val) => updateScore('growthVelocity', val)} explanation="Croissance rapide nécessitant une structuration" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-900">Sous-total Section 1:</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-900 text-lg px-3 py-1">
                  {calculateSection1()} / 20
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Maturité des processus & systèmes */}
        <Card className="mb-8 border-blue-200 bg-white">
          <CardHeader className="bg-blue-600 text-white border-b border-blue-200">
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">⚙️</span>
              Section 2 : Maturité des processus & systèmes
            </CardTitle>
            <CardDescription className="text-blue-100">
              Évaluez la maturité de vos processus et systèmes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Tableau pour l'alignement horizontal */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-blue-200">
                      <th className="text-left pb-3 text-blue-900 font-semibold">Critère</th>
                      <th className="text-center pb-3 w-32">1 (Faible)</th>
                      <th className="text-center pb-3 w-32">3 (Moyen)</th>
                      <th className="text-center pb-3 w-32">5 (Élevé)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Data Reliability */}
                    <tr className="border-b border-blue-100">
                      <td className="py-4 pr-4 align-top">
                        <div>
                          <h3 className="font-semibold text-blue-900">Fiabilité des données</h3>
                        </div>
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={1} currentScore={scores.dataReliability} onUpdate={(val) => updateScore('dataReliability', val)} explanation="Données dispersées (Excel), pas de source unique" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={3} currentScore={scores.dataReliability} onUpdate={(val) => updateScore('dataReliability', val)} explanation="CRM utilisé mais données incomplètes / incohérentes" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={5} currentScore={scores.dataReliability} onUpdate={(val) => updateScore('dataReliability', val)} explanation="CRM bien géré, source unique de vérité" />
                      </td>
                    </tr>

                    {/* Process Definition */}
                    <tr className="border-b border-blue-100">
                      <td className="py-4 pr-4 align-top">
                        <div>
                          <h3 className="font-semibold text-blue-900">Définition des processus</h3>
                        </div>
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={1} currentScore={scores.processDefinition} onUpdate={(val) => updateScore('processDefinition', val)} explanation="Processus ad-hoc, non documentés" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={3} currentScore={scores.processDefinition} onUpdate={(val) => updateScore('processDefinition', val)} explanation="Processus partiellement documentés mais peu suivis" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={5} currentScore={scores.processDefinition} onUpdate={(val) => updateScore('processDefinition', val)} explanation="Processus clairs, documentés et respectés" />
                      </td>
                    </tr>

                    {/* Forecast Accuracy */}
                    <tr>
                      <td className="py-4 pr-4 align-top">
                        <div>
                          <h3 className="font-semibold text-blue-900">Précision des prévisions</h3>
                        </div>
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={1} currentScore={scores.forecastAccuracy} onUpdate={(val) => updateScore('forecastAccuracy', val)} explanation="Écarts de > 20%" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={3} currentScore={scores.forecastAccuracy} onUpdate={(val) => updateScore('forecastAccuracy', val)} explanation="Écarts de 10 - 20%" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={5} currentScore={scores.forecastAccuracy} onUpdate={(val) => updateScore('forecastAccuracy', val)} explanation="Écarts de < 10% constants" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-900">Sous-total Section 2:</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-900 text-lg px-3 py-1">
                  {calculateSection2()} / 15
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Alignement Organisationnel */}
        <Card className="mb-8 border-blue-200 bg-white">
          <CardHeader className="bg-blue-600 text-white border-b border-blue-200">
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">🤝</span>
              Section 3 : Alignement Organisationnel
            </CardTitle>
            <CardDescription className="text-blue-100">
              Évaluez l'alignement au sein de votre organisation
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Tableau pour l'alignement horizontal */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-blue-200">
                      <th className="text-left pb-3 text-blue-900 font-semibold">Critère</th>
                      <th className="text-center pb-3 w-32">1 (Faible)</th>
                      <th className="text-center pb-3 w-32">3 (Moyen)</th>
                      <th className="text-center pb-3 w-32">5 (Élevé)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Inter-team Friction */}
                    <tr className="border-b border-blue-100">
                      <td className="py-4 pr-4 align-top">
                        <div>
                          <h3 className="font-semibold text-blue-900">Friction entre silos</h3>
                        </div>
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={1} currentScore={scores.interTeamFriction} onUpdate={(val) => updateScore('interTeamFriction', val)} explanation="Ventes / Marketing / CS se rejettent la faute" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={3} currentScore={scores.interTeamFriction} onUpdate={(val) => updateScore('interTeamFriction', val)} explanation="Collaboration occasionnelle" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={5} currentScore={scores.interTeamFriction} onUpdate={(val) => updateScore('interTeamFriction', val)} explanation="Collaboration fluide" />
                      </td>
                    </tr>

                    {/* Shared KPIs */}
                    <tr className="border-b border-blue-100">
                      <td className="py-4 pr-4 align-top">
                        <div>
                          <h3 className="font-semibold text-blue-900">KPIs partagés</h3>
                        </div>
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={1} currentScore={scores.sharedKPIs} onUpdate={(val) => updateScore('sharedKPIs', val)} explanation="Aucun KPI partagé" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={3} currentScore={scores.sharedKPIs} onUpdate={(val) => updateScore('sharedKPIs', val)} explanation="Quelques métriques communes" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={5} currentScore={scores.sharedKPIs} onUpdate={(val) => updateScore('sharedKPIs', val)} explanation="KPIs axés sur les revenus" />
                      </td>
                    </tr>

                    {/* Executive Commitment */}
                    <tr>
                      <td className="py-4 pr-4 align-top">
                        <div>
                          <h3 className="font-semibold text-blue-900">Direction exécutive</h3>
                        </div>
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={1} currentScore={scores.executiveCommitment} onUpdate={(val) => updateScore('executiveCommitment', val)} explanation="Pas prêt à déléguer" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={3} currentScore={scores.executiveCommitment} onUpdate={(val) => updateScore('executiveCommitment', val)} explanation="Volonté mais hésitation" />
                      </td>
                      <td className="py-4 text-center align-top">
                        <ScoreButton value={5} currentScore={scores.executiveCommitment} onUpdate={(val) => updateScore('executiveCommitment', val)} explanation="Engagement clair" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-900">Sous-total Section 3:</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-900 text-lg px-3 py-1">
                  {calculateSection3()} / 15
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="border-blue-200 bg-white">
          <CardHeader className="bg-blue-600 text-white border-b border-blue-200">
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              Interprétation des résultats
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="text-2xl font-bold text-blue-900 mb-2">
                Score total: {totalScore} / {maxScore}
              </div>
              <Progress value={progressPercentage} className="h-3 mb-4" />
              <Badge className={`${interpretation.color} text-white text-lg px-4 py-2`}>
                {interpretation.level}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-900 mb-3">Points clés à surveiller:</h3>
                <ul className="space-y-2">
                  {interpretation.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-blue-800">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-blue-900 mb-3">Action recommandée:</h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800 font-medium">{interpretation.action}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 italic">
                Un alignement fort est essentiel pour le succès d'un CRO
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}