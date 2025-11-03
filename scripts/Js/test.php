<?php
class Movie{
    public var $Name;
    public int $BoxOfficeRevenue;
    public int $Rating;


    public function __construct(){
        $this->Name = "Movie";
        $this->BoxOfficeRevenue = 0;
        $this->Rating = 0;
    }

}




?>