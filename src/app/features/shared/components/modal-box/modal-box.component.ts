import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ButtonComponent } from '../button/button.component'
import { TextComponent } from '../text/text.component'

@Component({
  selector: 'app-modal-box',
  standalone: true,
  imports: [ButtonComponent, TextComponent],
  templateUrl: './modal-box.component.html',
  styleUrl: './modal-box.component.scss',
})
export class ModalBoxComponent {
  title: string
  content: string
  confirmButtonText: string
  confirmButtonColor: 'primary' | 'secondary' | 'important'

  constructor(
    public dialogRef: MatDialogRef<ModalBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title
    this.content = data.content
    this.confirmButtonText = data.confirmButtonText || 'Confirm'
    this.confirmButtonColor = data.confirmButtonColor || 'primary'
  }

  onCancel(): void {
    this.dialogRef.close({ action: 'cancel' })
  }

  onConfirm(): void {
    this.dialogRef.close({ action: 'confirm' })
  }
}
