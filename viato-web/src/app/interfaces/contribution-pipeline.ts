export interface ContributionPipeline {
  id: number;
  sourceOrgId: number;
  destinationOrgId: number;
  contributionCurrency: number;
  collectedAmount: number;
  amountLimit: number;
}
