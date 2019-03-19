using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace neighborhoodDealer{
    public class reviews{
        [Key]
        public int reviewId{get;set;}

        [Required(ErrorMessage = "This field is required")]
        [MinLength(2, ErrorMessage = "Review must be atleast 2 characters")]
        [MaxLength(250, ErrorMessage = "Review must be less than 250 characters")]
        public string content{get;set;}

        public DateTime createdAt{get;set;}

        public int userId{get;set;}

        public users user{get;set;}

        public reviews(){
            createdAt = DateTime.Now;
        }
    }
}