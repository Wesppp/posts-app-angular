import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../../services/global.service";
import { Comment } from "../../interfaces/comment";
import {Post} from "../../interfaces/post";
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {
  comments: Comment[] = []
  post: Post = {id: 0, title: '', body: ''}
  isLoading: boolean = false

  constructor(private globalService: GlobalService,
              private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.route.params.subscribe((params: Params) => {
      this.getPost(params['id'])
      this.getComments(params['id'])
      this.isLoading = false
    })
  }

  getPost(id: number) {
    this.postService.getPost(id)
      .subscribe(post => {
        if (post) {
          this.post = post
        }
      })
  }

  getComments(id: number) {
    this.postService.getComments(id)
      .subscribe(comments => {
        if (comments.length) {
          this.comments = comments
        }
      })
  }
}