import { Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ButtonComponent } from '../../../shared/components/button/button.component'
import { ModalBoxComponent } from '../../../shared/components/modal-box/modal-box.component'
import { UserService } from '../../../../../services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss',
})
export class DeleteAccountComponent {
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}
  isLoading = false

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalBoxComponent, {
      width: '560px',
      data: {
        title: 'Profile Delete Confirmation',
        content:
          "We're truly sorry to see you go. Before you proceed with deleting your profile, we want you to know that this action is permanent and irreversible. You'll lose access to all your account information, course progress, certificates, and any learning communities youre a part of. If there's anything we can do to improve your experience or if you need assistance with any issues you've encountered, please reach out to our support team. We're always here to help. If you still wish to delete your account, please click on the 'Confirm' button below.",
        confirmButtonColor: 'important',
        isLoading: this.isLoading,
      },
    })

    dialogRef.afterClosed().subscribe((result: { action: string }) => {
      if (result && result.action === 'confirm') {
        this.isLoading = true
        this.userService.delete().subscribe({
          next: () => {
            this.isLoading = false
            this.router.navigate(['/login'])
          },
          error: () => (this.isLoading = false),
        })
      }
    })
  }
}
