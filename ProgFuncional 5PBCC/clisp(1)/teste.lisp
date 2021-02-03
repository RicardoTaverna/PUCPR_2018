
(defun f ( n )
   (cond ((= n 0) 
          1)
	 (t 
          (* n (f (- n 1))))
   )
)