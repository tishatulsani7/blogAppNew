import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
  registerFormGroup=new FormGroup({
      title:new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      img:new FormControl('',[Validators.required]),
      category:new FormControl('',[Validators.required]),
    })

    getFormControl(name:string){
      return this.registerFormGroup.get(name)
    }

    isFormControlError(name:string){
      return this.getFormControl(name)?.dirty && this.getFormControl(name)?.errors?.['required']
    }
}
