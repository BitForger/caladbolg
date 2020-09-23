resource "aws_cloudwatch_log_group" "log-group" {
  name = "/ecs/caladbolg"
  retention_in_days = 7
}

resource "aws_ecs_service" "main" {
  name = "caladbolg"
  task_definition = aws_ecs_task_definition.main.arn
  desired_count = 1
  ordered_placement_strategy {
    type = "spread"
  }

  cluster = "Production"
  launch_type = "EC2"
//  load_balancer {
//    container_name = "caladbolg"
//    container_port = 80
//    target_group_arn = aws_lb_target_group.main.arn
//  }
  depends_on = [ aws_ecs_task_definition.main, data.aws_iam_role.execution-role]
}
