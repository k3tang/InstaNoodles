class Api::ReviewsController < ApplicationController

    def index 
        user_id = current_user[:id]
        @reviews = Review.where(user_id: user_id)
        render 'api/review/index'
    end 

    def create
        @review = Review.new(review_params)
        if @review.save 
            render 'api/review/show'
        else 
            render json: {errors: ["Unable to create review"]}, status: 422
        end 
    end 


    private 

    def review_params
        params.require(:review).permit(
            :review,
            :user_id,
            :product_id,
            :rating)
    end 
end
