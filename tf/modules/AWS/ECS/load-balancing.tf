resource "aws_lb_target_group" "main" {
  name = "caladbolg"
  port = 80
  protocol = "HTTP"
  target_type = "instance"
  vpc_id = "vpc-97acecec"
  health_check {
    protocol = "HTTP"
    path = "/"
    healthy_threshold = 5
    unhealthy_threshold = 2
    timeout = 5
    interval = 30
    matcher = "200,201,401"
  }

  lifecycle {
    create_before_destroy = true
  }
}

data "aws_lb" "web-apps" {
  name = "Web-Apps"
}

data "aws_lb_listener" "http" {
  load_balancer_arn = data.aws_lb.web-apps.arn
  port = 80
}

data "aws_lb_listener" "https" {
  load_balancer_arn = data.aws_lb.web-apps.arn
  port = 443
}

resource "aws_lb_listener_rule" "http-rule" {
  listener_arn = data.aws_lb_listener.http.arn
  action {
    type = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }
  condition {
    host_header {
      values = ["bot.noahkovacs.me"]
    }
  }
}

resource "aws_lb_listener_rule" "https-rule" {
  listener_arn = data.aws_lb_listener.https.arn
  action {
    type = "forward"
    target_group_arn = aws_lb_target_group.main.arn
  }
  condition {
    host_header {
      values = ["bot.noahkovacs.me"]
    }
  }
}
