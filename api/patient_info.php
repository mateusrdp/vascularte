<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("dbmy0005.whservidor.com", "vascularte", "fmfr47", "vascularte");

$result = $conn->query("
	SELECT 
		DADOS_PACIENTE.id, 

		CONSULTA_PACIENTE.nome, 
		CONSULTA_PACIENTE.nascimento, 
		CONSULTA_PACIENTE.sexo, 
		CONSULTA_PACIENTE.cor, 
		CONSULTA_PACIENTE.estado_civil, 
		CONSULTA_PACIENTE.tel, 
		CONSULTA_PACIENTE.end, 
		CONSULTA_PACIENTE.profissao, 
		CONSULTA_PACIENTE.naturalidade, 
		CONSULTA_PACIENTE.procedencia, 
		CONSULTA_PACIENTE.indicacao, 
		CONSULTA_PACIENTE.obs,

		DADOS_PACIENTE.anamnese, 
		DADOS_PACIENTE.exame_fisico, 
		DADOS_PACIENTE.hip_diag, 
		DADOS_PACIENTE.conduta, 
		DADOS_PACIENTE.exames, 
		DADOS_PACIENTE.evolucao, 
		DADOS_PACIENTE.cirurgias

	FROM DADOS_PACIENTE INNER JOIN CONSULTA_PACIENTE ON DADOS_PACIENTE.id=CONSULTA_PACIENTE.pac_id 
	WHERE CONSULTA_PACIENTE.login='jvicente'
");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	if ($outp != "") {$outp .= ",";}
	$outp .= '{"id":"'  . $rs["id"] . '",';

	$outp .= '{"name":"'  . $rs["nome"] . '",';
	$outp .= '{"dob":"'  . $rs["nascimento"] . '",';
	$outp .= '{"gender":"'  . $rs["sexo"] . '",';
	$outp .= '{"ethnicity":"'  . $rs["cor"] . '",';
	$outp .= '{"civil_status":"'  . $rs["estado_civil"] . '",';
	$outp .= '{"phone":"'  . $rs["tel"] . '",';
	$outp .= '{"profession":"'  . $rs["profissao"] . '",';
	$outp .= '{"address":"'  . $rs["end"] . '",';
	$outp .= '{"natural_from":"'  . $rs["naturalidade"] . '",';
	$outp .= '{"origin":"'  . $rs["procedencia"] . '",';
	$outp .= '{"referred_by":"'  . $rs["indicacao"] . '",';
	$outp .= '{"obs":"'  . $rs["obs"] . '",';

	$outp .= '{"anamnesis":"'  . $rs["anamnese"] . '",';
	$outp .= '{"physical":"'  . $rs["exame_fisico"] . '",';
	$outp .= '{"hypothesis":"'  . $rs["hip_diag"] . '",';
	$outp .= '{"conduct":"'  . $rs["conduta"] . '",';
	$outp .= '{"evolution":"'  . $rs["evolucao"] . '",';
	$outp .= '{"examination":"'  . $rs["exames"] . '",';
	$outp .= '{"surgical_procedures":"'  . $rs["cirurgias"] . '",';	
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
?>
