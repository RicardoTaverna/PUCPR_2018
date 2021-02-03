(defun recupera_valor (simbolo lista_simbolos)

	(dolist (elemento lista_simbolos)
		(if (eq simbolo (car elemento))
			(return (cadr elemento))
		)
	)

)

(defun valida_regra (lista_regra lista_valores)

	(let ((condicoes (car lista_regra)) (conclusoes (cdr lista_regra)) (lista_resultados))

		(dolist (elemento condicoes)
			(setf (cadr elemento) (recupera_valor (cadr elemento) lista_valores))
			(setq lista_resultados (append lista_resultados (list (eval elemento))))
			;;(print elemento)
			;;(print (eval elemento))
		)
		
		;;(print lista_resultados)
		
		(if (eval (cons 'and lista_resultados))
			(print conclusoes)
		)
		
	)
	
)

;;(valida_regra '(((>= a 10)(< b 50)) ((conclusao "trazer algo"))) '((a 20)(b 30)))