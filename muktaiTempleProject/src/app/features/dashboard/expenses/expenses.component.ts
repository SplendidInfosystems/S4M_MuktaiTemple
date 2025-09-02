import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AddExpencesService } from '../../services/add-expences.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {

  constructor(
    private router: Router,
    private expenseService: AddExpencesService
  ) {}

  ngOnInit() {
    // Load existing static expenses into service on init
    this.defaultExpenses.forEach(exp => this.expenseService.addExpense(exp));
  }

  // Default static records
  defaultExpenses = [
    {
      date: '01.01.25',
      expenseName: 'Electricity Bill',
      category: 'Utilities',
      amount: '200 Rs',
      description: 'Monthly electricity bill payment',
      status: 'Paid'
    },
    {
      date: '01.02.25',
      expenseName: 'Electricity Bill',
      category: 'Utilities',
      amount: '400 Rs',
      description: 'Monthly electricity bill payment',
      status: 'Unpaid'
    },
    {
      date: '05.03.25',
      expenseName: 'Bill',
      category: 'Utilities',
      amount: '500 Rs',
      description: 'Monthly electricity bill payment',
      status: 'Paid'
    },
    {
      date: '05.05.25',
      expenseName: 'Electricity Bill',
      category: 'Utilities',
      amount: '700 Rs',
      description: 'Monthly electricity bill payment',
      status: 'Paid'
    }
  ];

  // ✅ Use only this one (no duplicate getter/field!)
  get expenses() {
    return this.expenseService.getExpenses();
  }

  // Open Add Expense Page
  openAddExpenseModal() {
    this.router.navigate(['/dashboard/add-expenses']);
  }

  // PDF Generator
generatePDF(expense: any) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Temple Expense Report', 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [['Field', 'Value']],
    body: [
      ['Expense Title', expense.expenseName],
      ['Date', expense.date],
      ['Category', expense.category === 'Others' ? expense.otherCategory : expense.category],
      ['Amount', expense.amount + ' Rs'],
      ['Status', expense.status],
      ['Notes', expense.description]
    ]
  });

  // ✅ Create blob
  const pdfBlob = doc.output('blob');

  // ✅ Wrap blob in a File object → filename preserved in browser download
  const file = new File([pdfBlob], `${expense.expenseName}_${expense.date}.pdf`, { type: "application/pdf" });

  // ✅ Create URL for the File
  const pdfUrl = URL.createObjectURL(file);

  // ✅ Open in new tab → only preview
  window.open(pdfUrl, '_blank');
}



}
