export class Contribution {
  id: number;
  contributionPipelineId: number;
  contributorId: number;
  amount: number;
  contributionProofId?: number;
  isPrivate: boolean;
}
