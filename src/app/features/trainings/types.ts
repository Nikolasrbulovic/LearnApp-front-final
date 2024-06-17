export type TrainingTableModel =
  | {
      date: string
      trainingName: string
      type: string
      duration: string
    } & (
      | {
          trainerName: string
        }
      | { studentName: string }
    )
