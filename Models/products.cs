using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace neighborhoodDealer{
    public class products{
        [Key]
        public int productId{get;set;}

        [Required(ErrorMessage = "Title field is required.")]
        [MinLength(2, ErrorMessage = "Title has to be longer than 2 characters.")]
        [MaxLength(75, ErrorMessage = "Title cannot be longer than 75 characters.")]
        public string title{get;set;}

        [Required(ErrorMessage = "Price is required.")]
        [Range(0.01, Double.PositiveInfinity, ErrorMessage = "Price has to be greater than 0.")]
        public decimal price{get;set;}

        [Required(ErrorMessage = "Image is required.")]
        [RegularExpression(@"data:(?<mime>[\w/\-\.]+);(?<encoding>\w+),(?<data>.*)", ErrorMessage = "Invalid Image.")] 
        public string image{get;set;}

        [Required(ErrorMessage = "Latitude is required.")]
        public double longitude{get;set;}

        [Required(ErrorMessage = "Latitude is required.")]
        public double latitude{get;set;}

        [Required(ErrorMessage = "City and State is required.")]
        [MinLength(4, ErrorMessage = "City and State has to be longer than 4 characters")]
        [MaxLength(150, ErrorMessage = "City and State has to be shorter than 150 characters")]
        public string city{get;set;}

        [Required(ErrorMessage = "Description is required.")]
        [MinLength(4, ErrorMessage = "Description has to be longer than 4 characters")]
        [MaxLength(150, ErrorMessage = "Description has to be shorter than 150 characters")]
        public string desc{get;set;}

        public DateTime createdAt{get;set;}

        public int userId{get;set;}
        public users user{get;set;}

        public products(){
            createdAt = DateTime.Now;
        }
    }
}