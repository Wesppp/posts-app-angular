import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../interfaces/post";
import {GlobalService} from "../../services/global.service";

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.scss']
})
export class AddPostDialogComponent implements OnInit {

  posts: Post[] = []
  post: Post = {id: 0, title: '', body: ''}

  constructor(private postService: PostService,
              private globalService: GlobalService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  addPost(title: string, body: string) {
    this.postService.addPost({title, body} as Post)
      .subscribe(post => {
        if (post) {
          this.globalService.openSnackBar("Post was added!")
          this.globalService.updateComponent({refresh: true});
        }
      })
  }
}
