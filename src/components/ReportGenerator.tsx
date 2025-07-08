
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Aircraft {
  id: string;
  callsign: string;
  status: 'operational' | 'caution' | 'critical';
  health: number;
  altitude: number;
  speed: number;
  battery: number;
  temperature: number;
  lastUpdate: string;
}

interface ReportGeneratorProps {
  aircraft: Aircraft;
}

export function ReportGenerator({ aircraft }: ReportGeneratorProps) {
  const { t } = useTranslation();

  const generateReport = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Header
    doc.setFontSize(20);
    doc.text(`${t('app.title')} - ${t('reports.title')}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`${t('reports.generated')}: ${currentDate}`, 20, 30);
    doc.text(`${t('reports.aircraftId')}: ${aircraft.id}`, 20, 40);
    doc.text(`${t('reports.callsign')}: ${aircraft.callsign}`, 20, 50);
    
    // Aircraft Status
    doc.setFontSize(16);
    doc.text(t('reports.statusOverview'), 20, 70);
    
    const statusData = [
      [t('reports.parameter'), t('reports.value'), t('reports.status')],
      [t('aircraft.overallHealth'), `${aircraft.health}%`, aircraft.status.toUpperCase()],
      [t('aircraft.altitude'), `${aircraft.altitude} ft`, t('reports.normal')],
      [t('aircraft.speed'), `${aircraft.speed} knots`, t('reports.normal')],
      [t('aircraft.battery'), `${aircraft.battery}%`, aircraft.battery > 30 ? t('reports.normal') : t('reports.low')],
      [t('aircraft.temperature'), `${aircraft.temperature}°F`, aircraft.temperature < 100 ? t('reports.normal') : t('reports.high')],
      [t('aircraft.lastUpdate'), aircraft.lastUpdate, t('reports.current')]
    ];

    let finalY = 80;
    autoTable(doc, {
      startY: 80,
      head: [statusData[0]],
      body: statusData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [51, 65, 85] },
      styles: { fontSize: 10 },
      didDrawPage: function (data) {
        finalY = data.cursor?.y || 80;
      }
    });

    // Component Health Analysis
    doc.setFontSize(16);
    doc.text(t('reports.componentHealth'), 20, finalY + 20);
    
    const componentData = [
      [t('reports.component'), t('reports.healthPercent'), t('reports.status'), t('reports.nextMaintenance')],
      [t('reports.engine'), '94', t('reports.good'), t('reports.flightHours', { hours: 150 })],
      [t('reports.avionics'), '87', t('reports.good'), t('reports.flightHours', { hours: 75 })],
      [t('reports.navigation'), '76', t('reports.caution'), t('reports.flightHours', { hours: 25 })],
      [t('reports.communication'), '91', t('reports.good'), t('reports.flightHours', { hours: 100 })]
    ];

    autoTable(doc, {
      startY: finalY + 30,
      head: [componentData[0]],
      body: componentData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [51, 65, 85] },
      styles: { fontSize: 10 }
    });

    // Footer
    doc.setFontSize(10);
    doc.text(t('reports.footer'), 20, doc.internal.pageSize.height - 20);
    doc.text(t('reports.classification'), 20, doc.internal.pageSize.height - 10);

    // Save the PDF
    doc.save(`${t('app.title')}_${t('reports.report')}_${aircraft.id}_${currentDate}.pdf`);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-400" />
          {t('reports.diagnosticReport')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            {t('reports.generateDescription', { callsign: aircraft.callsign })}
          </p>
          <Button 
            onClick={generateReport}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            {t('reports.generatePdf')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
