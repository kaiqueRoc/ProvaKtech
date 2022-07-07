<?php
require_once('list_activities.php');

$page = (isset($_GET['page'])) ? $_GET['page'] : 1;
$activities = getActivities();

$activity_total = count($activities);
$qtd_per_page = 5;
$begin = ($qtd_per_page * $page) - $qtd_per_page;
$limit = $begin + $qtd_per_page;

foreach ($activities as $key => $activity) {
    if ($key >= $begin && $key < $limit) {
        $result_activities[] = $activity;
    }
}

echo (isset($result_activities))
    ? json_encode($result_activities, JSON_UNESCAPED_UNICODE)
    : json_encode("Não há dados para exibir", JSON_UNESCAPED_UNICODE);
