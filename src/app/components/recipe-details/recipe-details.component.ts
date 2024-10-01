import { Component } from '@angular/core';
import { RecipeDetailModel } from '../../models/recipe-detail.model';
import { SharedModule } from '../../modules/shared.module';
import { RecipeDetailPipe } from '../../pipes/recipe-detail.pipe';
import { ProductModel } from '../../models/product.model';
import { RecipeModel } from '../../models/recipe.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [SharedModule, RecipeDetailPipe],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent {
  recipe: RecipeModel = new RecipeModel();
  search: string = '';
  products: ProductModel[] = [];
  recipeId: string = '';
  isUpdateFormActive: boolean = false;

  /* @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;

    we use model, but not modal
   */
  createModel: RecipeDetailModel = new RecipeDetailModel();
  updateModel: RecipeDetailModel = new RecipeDetailModel();

  constructor(
    private http: HttpService,
    private swal: SwalService,
    private activated: ActivatedRoute //this can catch the id
  ) {
    this.activated.params.subscribe((res) => {
      this.recipeId = res['id'];
      this.getRecipeById();
      this.createModel.recipeId = this.recipeId;
    });
  }

  ngOnInit(): void {
    /* this.getRecipeById(); 
    dont use it, because we have to detect ID from routing and use it.
    */
    this.getAllProducts();
  }

  getRecipeById() {
    this.http.post<RecipeModel>(
      'RecipeDetails/GetRecipeByIdWithDetails',
      { recipeId: this.recipeId },
      (res) => {
        this.recipe = res;
      }
    );
  }

  getAllProducts() {
    this.http.post<ProductModel[]>('Products/Getall', {}, (res) => {
      this.products = res.filter((p) => p.type.value == 2);
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>(
        'RecipeDetails/Create',
        this.createModel,
        (res) => {
          this.swal.callToas(res);
          this.createModel = new RecipeDetailModel();
          this.createModel.recipeId = this.recipeId;
          this.getRecipeById();
        }
      );
    }
  }

  deleteById(model: RecipeDetailModel) {
    this.swal.callSwal(
      'Delete the product on Recipe!!',
      `Do you wanna delete the Product: ${model.product.name}`,
      () => {
        this.http.post<string>(
          'RecipeDetails/DeleteById',
          { id: model.id },
          (res) => {
            this.getRecipeById();
            this.swal.callToas(res, 'info');
          }
        );
      }
    );
  }

  get(model: RecipeDetailModel) {
    this.updateModel = { ...model };
    this.updateModel.product =
      this.products.find(
        (product) => product.id == this.updateModel.productId
      ) ?? new ProductModel(); //if find, bring it. if not, return an empty product.
    this.isUpdateFormActive = true;
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>(
        'RecipeDetails/Update',
        this.updateModel,
        (res) => {
          this.swal.callToas(res, 'info');
          this.getRecipeById();
          this.isUpdateFormActive = false;
        }
      );
    }
  }
}
