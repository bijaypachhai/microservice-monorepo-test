import { Controller, Get, Res } from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import { register } from "prom-client";
import { Response } from "express";

@Controller("/")
export class AppController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get("/hello")
  async getHello(): Promise<string> {
    this.metricsService.incrementRequestCounter();

    console.log("Metrics: ", await this.metricsService.getCount());

    return "Hello from Prometheus";
  }

  @Get("metrics")
  async sendMetrics(@Res() res: Response): Promise<any> {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  }
}
