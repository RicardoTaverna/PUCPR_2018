(defun separaString ()
	
)


(defun arquivo ()
	
	(with-open-file (stream "E:\\DEV\\PucPR\\ProgFuncional 5PBCC\\tde2\\file.txt")
		(do (
				(line (read-line stream nil nil)
					(read-line stream nil nil)
				)
			)
			((null line))
			(print line)
		)
	)
)