export interface CalculationResult {
  noAction: MortgageCalculationResult;
  onlyRepayment: MortgageCalculationResult;
  onlyInvesting: MortgageCalculationResult;
  fiftyFifty: MortgageCalculationResult;
}

export interface MortgageCalculationResult {
  overview: OverviewDetails;
  assetsDetails: AssetsDetails;
  mortgageDetails: MortgageDetails;
  investmentDetails: InvestmentDetails;
}

export interface MonthlyPaymentDetails {
  month: number;
  year: number;
  monthlyPayment: number;
  interestPaid: number;
  principalPaid: number;
  remainingDebt: number;
  monthlyPaymentReduction: number;
  monthlyPaymentSavedInterest: number;
  totalInterestSavedWithRepayment: number;
  returnOnRepaymentPercentage: number;
  lastRepaymentAmount: number;
  leftOverFromLastRepayment: number;
}

export interface MortgageDetails {
  totalMonths: number;
  totalCost: number;
  totalInterest: number;
  totalDebt: number;
  totalSavedOnInterest: number;
  estimatedRepayment?: number;
  interestSavedIfKeepPayment?: number;
  monthlyPayments: MonthlyPaymentDetails[];
  repaymentDetails: RepaymentDetails;
}

interface OverviewDetails {
  earned: number;
  costs: number;
  net: number;
}

interface AssetsDetails {
  houseValue: number;
  savings: number;
}

interface RepaymentDetails {
  amount: number;
  count: number;
}

interface InvestmentDetails {
  profit: number;
  invested: number;
}
