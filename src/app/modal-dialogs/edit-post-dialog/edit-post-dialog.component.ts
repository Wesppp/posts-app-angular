import {Component, OnInit} from '@angular/core';
import {Post} from "../../interfaces/post";
import {GlobalService} from "../../services/global.service";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss']
})
export class EditPostDialogComponent implements OnInit {
  post: Post = {id: 0, title: '', body: ''}

  constructor(private globalService: GlobalService,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.globalService.updateObservable$.subscribe(post => {
      if(post) {
        this.post = post;
      }
    })
  }

  editPost(title: string, body: string, id: number) {
    this.postService.editPost({title, body} as Post, id)
      .subscribe(data => {
        if (data) {
          console.log(data)
          this.globalService.openSnackBar("The post was edited")
        }
      }, error => this.globalService.openSnackBar(error.message))
  }
}
