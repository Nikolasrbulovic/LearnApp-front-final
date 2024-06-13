import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalBoxComponent } from '../../../shared/components/modal-box/modal-box.component';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss',
})
export class DeleteAccountComponent {
  constructor(public dialog: MatDialog) {}
  isDialogOpen = false;

  openDialog(): void {
    if (this.isDialogOpen) {
      return;
    }
    const dialogRef = this.dialog.open(ModalBoxComponent, {
      width: '560px',
      data: {
        title: 'Profile Delete Confirmation',
        content:
          "We're truly sorry to see you go. Before you proceed with deleting your profile, we want you to know that this action is permanent and irreversible. You'll lose access to all your account information, course progress, certificates, and any learning communities youre a part of. If there's anything we can do to improve your experience or if you need assistance with any issues you've encountered, please reach out to our support team. We're always here to help. If you still wish to delete your account, please click on the 'Confirm' button below.",
        confirmButtonColor: 'important',
      },
    });
    this.isDialogOpen = true;

    dialogRef.afterClosed().subscribe((result: { action: string }) => {
      console.log('The dialog was closed', result);
      if (result && result.action === 'confirm') {
        // Handle the confirm action
      } else {
        // Handle the cancel action
      }
      this.isDialogOpen = false;
    });
  }
}
