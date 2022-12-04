export class ElfAssignment {
  public readonly from: number;
  public readonly to: number;

  private readonly RANGE_DELIMINATOR = "-";

  constructor(range: string) {
    const [from, to] = range.split(this.RANGE_DELIMINATOR).map(Number);

    this.from = from;
    this.to = to;
  }

  public amIFullyContainedBy({ from, to }: ElfAssignment): number {
    return this.from >= from && this.to <= to ? 1 : 0;
  }

  public hasOverlapWith({ from, to }: ElfAssignment): 0 | 1 {
    const isThereOverlap =
      (this.from >= from && this.from <= to) ||
      (this.to <= to && this.to >= from);

    return isThereOverlap ? 1 : 0;
  }
}
