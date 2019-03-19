using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace neighborhoodDealer{
    public class messages{
        [Key]
        public int messageId{get;set;}

        [Required(ErrorMessage = "This field is required")]
        [MinLength(2, ErrorMessage = "Message must be atleast 2 characters")]
        [MaxLength(250, ErrorMessage = "Message must be less than 250 characters")]
        public string content{get;set;}

        [RegularExpression(@"data:(?<mime>[\w/\-\.]+);(?<encoding>\w+),(?<data>.*)", ErrorMessage = "Invalid Image")] 
        public string image{get;set;}

        public DateTime createdAt{get;set;}

        public int userId{get;set;}

        public int offerId{get;set;}

        [NotMapped]
        public offers offer{get;set;}

        public messages(){
            createdAt = DateTime.Now;
        }
    }
}