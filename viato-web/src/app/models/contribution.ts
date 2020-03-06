export class Contribution {
  id: number;
  contributionDate: Date;
  contributionPipelineId: number;
  contributorId: number;
  amount: number;
  contributionProofId?: number;
  isPrivate: boolean;
}
