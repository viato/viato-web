export interface ContributionPipeline {
  id: number;
  displayName: string;
  sourceOrgId: number;
  destinationOrgId: number;
  contributionCurrency: string;
  collectedAmount: number;
  amountLimit: number;
}
